export default class SystemUtils {
  static UrlParam(paramName: string) {
    let url: string = window.location.search
    url = url.substring(1, url.length)
    const params: string[] = url.split('&')
    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      const value: string[] = param.split('=')
      if (value.length == 2 && value[0] == paramName) {
        return value[1].split('#')[0]
      }
    }
    return ''
  }
}
