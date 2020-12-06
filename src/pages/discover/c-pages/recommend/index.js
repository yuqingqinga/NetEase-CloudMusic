import React, { memo } from 'react';

import {Content, RecommendLeft, RecommendRight, RecommendWrapper} from './style';
import TopBanner from './c-cpns/top-banner';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RecommendRanking from './c-cpns/recommend-ranking'
import UserLogin from './c-cpns/user-login';
import SettleSinger from './c-cpns/settle-singer';
import HotAnchor from './c-cpns/hot-anchor';


export default memo(function Recommend() {
    return (
       <RecommendWrapper>
           <TopBanner/>
           <Content className='wrap-v2'>
               <RecommendLeft>
                   <HotRecommend/>
                   <NewAlbum/>
                   <RecommendRanking/>
               </RecommendLeft>
               <RecommendRight>
                   <UserLogin/>
                   <SettleSinger/>
                   <HotAnchor/>
               </RecommendRight>
           </Content>
       </RecommendWrapper>
    )
})
