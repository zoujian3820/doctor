/**
 * 通用API
 * */
export default {
  /**
   * @desc: 微信config
   * @param: {object} 微信参数
   */
  async wxConfig(app, params) {
    const { data } = await app.$axios.get(`/wechat/jsconfig`, {
      params
    })
    return data || {}
  },
  /**
   * @desc: 问诊单图片上传
   * @param: {object}
   * key: mediaIds [xxxx, xxx]
   * */
  async consultImageStore(app, mediaIds) {
    const { data } = await app.$axios.post(
      `/user/schedule/consult/image/store`,
      {
        mediaIds
      }
    )
    return data || {}
  },
  /**
   * @desc: h5图片上传
   * @param: {formData}
   * */
  h5UploadImage(app, formData) {
    return app.$axios({
      method: 'post',
      url: '/common/upload/image',
      processData: false,
      contentType: false,
      data: formData
    })
  },
  /**
   * @desc: 用户反馈提交
   * @param: {object}
   * */
  async feedBack(app, params) {
    return await app.$axios.post(`/feedback/save`, params)
  },
  /**
   * @desc: 错误上报接口 前端异常收集
   * @param: {object}
   * */
  async frontendErr(app, params) {
    try {
      await app.$axios.post(`/frontend_err`, params)
    } catch (error) {
      console.log(error)
    }
  }
}
