class Services {
  static get SERVICES() {
    return {
      niconico: "niconico",
      youtube: "youtube",
    }
  }

  /**
   * URLからサービスの特定＋IDの抜き出し
   @returns {object} {kind:種別, site:サイト, id:ID}
   */
  static detect_service(url) {
    // TODO URLからサービスの特定
    var kind
    var site
    var id
    return {kind: kind, site: site, id: id}
  }
}
