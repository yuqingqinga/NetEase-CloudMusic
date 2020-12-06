import React, { memo, useEffect,useState } from 'react';

import ThemeHeaderRcm from '@/components/theme-header-rcm';
import { HotRecommendWrapper } from './style';
import axios from 'axios';
import SongsCover from '@/components/songs-cover';

export default memo(function HotRecommend() {
    const [HotRecommend,setHotRecommend] = useState([]);

    useEffect(() => {
        axios({
            url:"http://123.207.32.32:9001/personalized?limit=8"
        }).then(res => {
           setHotRecommend(res.data.result);
        })
    },[]);
    // console.log(HotRecommend);

    return (
       <HotRecommendWrapper>
           <ThemeHeaderRcm title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]}/>
           <div className="recommend-list">
               {
                   HotRecommend.map((item,index) => {
                   return <SongsCover key={item.id} info={item}/>
                   })
               }
           </div>
       </HotRecommendWrapper>
    )
})
