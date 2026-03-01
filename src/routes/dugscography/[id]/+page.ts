import type { PageLoad } from './$types'
import { dugs, type Dug } from '$lib/clientData/dugs'
const dugValues = Object.values(dugs)

export const load: PageLoad = ({ params }) => {
    const dugIdx = dugValues.findIndex(d => d.id === params.id)
    const dug: Dug | undefined = dugValues[dugIdx];
    let prevDug: Dug | undefined = dugValues[dugIdx+1];
    let nextDug: Dug | undefined = dugValues[dugIdx-1];
    if (nextDug.title === "NULL") nextDug = undefined;
    return { id: params.id, dug, prevDug, nextDug }
}