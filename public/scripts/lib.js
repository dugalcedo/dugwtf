const _ = selector => {
    let matches = document.querySelectorAll(selector)
    switch (matches.length) {
        case 0:
            return null
            break
        case 1:
            return matches[0]
            break
        default:
            return matches
    }
}

const hide = el => { el.style.display = 'none' }
const show = el => { el.style.display = 'block' }

const each = (_returned, callback) => {
    if (!_returned) return
    if (_returned instanceof NodeList) {
        _returned.forEach(callback)
    } else callback(_returned)
}

function style(el, props) {
    Object.entries(props).forEach(([prop, val]) => {
        if (!el.style) return
        el.style[prop] = val
    })
}

const createComponent = (obj, parent) => {
    if (obj.if !== undefined) {
        if (!obj.if) return
     }
	obj.tag = obj.tag || 'div'
	let el = document.createElement(obj.tag)
  Object.entries(obj).forEach(([key, value]) => {
  	if (key.startsWith('content')) el.insertAdjacentHTML('afterbegin', value)
  	switch (key) {
    	case 'attr':
      	Object.entries(value).forEach(([k, v]) => {el.setAttribute(k, v)})
      	break
      case 'style':
      	Object.entries(value).forEach(([k, v]) => {
        	el.style[k] = v
        })
      	break
      case 'events':
      	Object.entries(value).forEach(([k, v]) => {
        	el.addEventListener(k, v)
        })
      	break
      case 'children':
      	obj.children.forEach(child => {
        	createComponent(child, el)
        })
      	break
    }
  })
  if (parent) parent.append(el)
  return el
}

function calculateTheCurrentAgeOfDugAlcedo() {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()
    let age = year - 1992
    if (month < 6) {
        age --
    } else if (month === 6 && date < 3) {
        age --
    }
    return age
}