import React, { memo, useEffect, useState } from 'react';

import ThemeHeaderRCM from '@/components/theme-header-rcm';
import {RankingWrapper} from './style'
import axios from 'axios';
import TopRanking from '@/components/top-ranking';

export default memo(function RecommendRanking() {
    //飙升榜
    const [SoaringList, setSoaringList] = useState([]);
    // 新歌榜
    const [newSongs, setNewSongs] = useState([]);
    // 原创榜
    const [originalList ,setOriginalList] = useState([]);
    useEffect(() => {
        axios({
            url:"http://123.207.32.32:9001/top/list?idx=0"
        }).then(res => {
            setSoaringList(res.data.playlist);
        })

        axios({
            url:"http://123.207.32.32:9001/top/list?idx=2"
        }).then(res => {
           setNewSongs(res.data.playlist);
        })

        axios({
            url:"http://123.207.32.32:9001/top/list?idx=3"
        }).then(res => {
            setOriginalList(res.data.playlist);
        })
    },[]);
    // console.log(SoaringList);
    // console.log(newSongs);
    // console.log(originalList);

    return (
       <RankingWrapper>
             <ThemeHeaderRCM title="榜单"/>
             <div className="tops">
                 <TopRanking info={SoaringList}/>
                 <TopRanking info={newSongs}/>
                 <TopRanking info={originalList}/>
             </div>
       </RankingWrapper>
    )
})
