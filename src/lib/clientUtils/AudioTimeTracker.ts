interface AudioTimeTrackerOptions {
  onSecondIncrement?: (totalSeconds: number) => void;
  updateInterval?: number; // in milliseconds, defaults to 1000 (1 second)
}

export class AudioTimeTracker {
  private audio: HTMLAudioElement;
  private totalListenTime: number = 0;
  private lastUpdateTime: number | null = null;
  private isTracking: boolean = false;
  private waitingForData: boolean = false;
  private options: Required<AudioTimeTrackerOptions>;
  private animationFrameId: number | null = null;
  private lastReportedSecond: number = 0;

  constructor(audioElement: HTMLAudioElement, options: AudioTimeTrackerOptions = {}) {
    this.audio = audioElement;
    this.options = {
      onSecondIncrement: options.onSecondIncrement || (() => {}),
      updateInterval: options.updateInterval || 1000
    };
    
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    // Listen for both play and playing events
    this.audio.addEventListener('play', () => {
      // Don't start tracking immediately on play - wait for 'playing' or 'canplay'
      // But we need to handle the case where the audio is already loaded
      if (this.audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        this.waitingForData = false;
        this.startTracking();
      }
    });
    
    this.audio.addEventListener('playing', () => {
      this.waitingForData = false;
      this.startTracking();
    });
    
    // Stop tracking on pause
    this.audio.addEventListener('pause', () => this.stopTracking());
    
    // Handle buffering/starved playback
    this.audio.addEventListener('waiting', () => {
      this.waitingForData = true;
      this.stopTracking();
    });
    
    // Resume tracking when buffer is ready
    this.audio.addEventListener('canplay', () => {
      if (this.waitingForData && !this.audio.paused) {
        this.waitingForData = false;
        this.startTracking();
      }
    });
    
    this.audio.addEventListener('canplaythrough', () => {
      if (this.waitingForData && !this.audio.paused) {
        this.waitingForData = false;
        this.startTracking();
      }
    });
    
    // Handle seeking - stop tracking during seek
    this.audio.addEventListener('seeking', () => this.stopTracking());
    this.audio.addEventListener('seeked', () => {
      if (!this.audio.paused && !this.waitingForData) {
        this.startTracking();
      }
    });
    
    // Handle ended
    this.audio.addEventListener('ended', () => this.stopTracking());
    
    // Handle stalled (different from suspend - means data is not arriving when expected)
    this.audio.addEventListener('stalled', () => this.stopTracking());
    
    // Note: 'suspend' is intentionally omitted. Browsers fire it routinely when they
    // stop downloading (e.g. enough data is buffered), even during normal playback.
    // The 'waiting' event already handles the case where playback is actually blocked.
    
    // Page visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopTracking();
      } else if (!this.audio.paused && !this.waitingForData) {
        // Only resume if actually playing and not buffering
        this.startTracking();
      }
    });
  }
  
  private startTracking(): void {
    // Don't start if already tracking or waiting for data
    if (this.isTracking || this.waitingForData) return;
    
    // Don't start if audio is actually paused
    if (this.audio.paused) return;
    
    this.isTracking = true;
    this.lastUpdateTime = Date.now();
    this.lastReportedSecond = Math.floor(this.totalListenTime);
    
    // Cancel any existing animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Use requestAnimationFrame for smooth updates
    this.updateLoop();
  }
  
  private stopTracking(): void {
    if (!this.isTracking) return;
    
    // Add the last segment of time
    if (this.lastUpdateTime) {
      this.totalListenTime += (Date.now() - this.lastUpdateTime) / 1000;
      
      // Check if we crossed a second boundary on stop
      const currentSecond = Math.floor(this.totalListenTime);
      if (currentSecond > this.lastReportedSecond) {
        this.options.onSecondIncrement(this.totalListenTime);
        this.lastReportedSecond = currentSecond;
      }
    }
    
    this.isTracking = false;
    this.lastUpdateTime = null;
    
    // Cancel animation frame if any
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  private updateLoop = (): void => {
    if (!this.isTracking) return;
    
    const now = Date.now();
    
    // Double-check we're still actually playing
    if (this.audio.paused || this.waitingForData) {
      this.stopTracking();
      return;
    }
    
    // Only count time if we're actually playing and not buffering
    if (this.lastUpdateTime) {
      const elapsedSeconds = (now - this.lastUpdateTime) / 1000;
      
      // Update total time
      this.totalListenTime += elapsedSeconds;
      this.lastUpdateTime = now;
      
      // Check if we've crossed a second boundary
      const currentSecond = Math.floor(this.totalListenTime);
      if (currentSecond > this.lastReportedSecond) {
        this.options.onSecondIncrement(this.totalListenTime);
        this.lastReportedSecond = currentSecond;
      }
    }
    
    // Continue the loop
    this.animationFrameId = requestAnimationFrame(this.updateLoop);
  };
  
  /**
   * Get the current total listen time in seconds
   */
  public getListenTime(): number {
    // Get current total including any active session
    if (this.isTracking && this.lastUpdateTime) {
      return this.totalListenTime + (Date.now() - this.lastUpdateTime) / 1000;
    }
    return this.totalListenTime;
  }
  
  /**
   * Reset the listen time counter to zero
   */
  public reset(): void {
    this.stopTracking();
    this.totalListenTime = 0;
    this.lastReportedSecond = 0;
  }
  
  /**
   * Manually set the listen time (useful for restoring from saved state)
   */
  public setListenTime(seconds: number): void {
    const wasTracking = this.isTracking;
    this.stopTracking();
    this.totalListenTime = seconds;
    this.lastReportedSecond = Math.floor(seconds);
    if (wasTracking) {
      this.startTracking();
    }
  }
  
  /**
   * Clean up event listeners and stop tracking
   */
  public destroy(): void {
    this.stopTracking();
    // Remove event listeners if needed (requires keeping bound functions)
    // This is a simplified version - you might want to store bound references
  }
}