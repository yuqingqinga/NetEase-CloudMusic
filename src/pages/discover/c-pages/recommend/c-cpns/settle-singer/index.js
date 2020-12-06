import React, { memo, useEffect, useState } from 'react';

import axios from 'axios';
import {SetterSingerWrapper } from "./style";
import ThemeHeaderSmall from '@/components/theme-header-small';
import {getSizeImage} from '@/utils/format-utils'


export default memo(function SettleSinger() {

    const [settleSinger, setSettleSinger] = useState([]);
   useEffect(() => {
       axios({
           url:"http://123.207.32.32:9001/artist/list?limit=5"
       }).then(res => {
           setSettleSinger(res.data.artists);
       })
   },[])
//    console.log(settleSinger);

    return (
        <SetterSingerWrapper>
            <ThemeHeaderSmall title="入驻歌手" more="查看全部>" />
            <div className="singer-list">
                {
                    settleSinger.map((item, index) => {
                        return (
                        <a href="/singer" key={item.id} className="item">
                            <img src={getSizeImage(item.img1v1Url, 62)} alt="" />
                            <div className="info">
                            <div className="title">{item.alias.join("") || item.name}</div>
                            <div className="name">{item.name}</div>
                            </div>
                        </a>
                        )
                    })
                }
            </div>
            <div className="apply-for">
                <a href="/abc">申请成为网易音乐人</a>
            </div>
    </SetterSingerWrapper>
    )
})
