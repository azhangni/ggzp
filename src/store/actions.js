import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_GOODS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategory, reqLogout,
  reqShops, reqUserInfo,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo
} from '../api'
export default {
  async getAddress({commit,state}){
    const geohash=state.latitude+','+state.longitude
    const result=await reqAddress(geohash)
    if(result.code===0){
      const address=result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys({commit,state}){
    const result=await reqFoodCategory()
    if(result.code===0){
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  // 异步获取商家列表
  async getShops({commit,state}){
    const {longitude,latitude}= state
    const result=await reqShops(longitude,latitude)
    if(result.code===0){
      const shops=result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  // 同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  // 异步获取用户信息
  async getUserInfo({commit}){
    const result=await reqUserInfo()
    if(result.code===0){
      const userInfo=result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  // 异步登出
  async logout({commit}){
    const result=await reqLogout()
    if(result.code===0){
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}){
    const result=await reqShopInfo()
    if(result.code===0){
      const info=result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit}){
    const result=await reqShopRatings()
    if(result.code===0){
      const ratings=result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({commit}){
    const result=await reqShopGoods()
    if(result.code===0){
      const goods=result.data
      commit(RECEIVE_GOODS,{goods})
    }
  }
}
