import React, { memo, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import {Carousel} from 'antd'
import ThemeHeaderRCM from '@/components/theme-header-rcm';
import { AlbumWrapper } from './style';
import AlbumCover from '@/components/album-cover';

export default memo(function NewAlbum() {

    const [newAlbum, setAlbum] = useState([]);
    useEffect(() => {
        axios({
            url:"http://123.207.32.32:9001/top/album/?limit=10"
        }).then(res => {
            setAlbum(res.data.albums);
        })
    },[]);
    // console.log(newAlbum);
    const pageRef = useRef();

    return (
        <AlbumWrapper>
            <ThemeHeaderRCM title="新碟上架"/>
            <div className='content'>
                <button className='arrow arrow-left sprite_02'
                    onClick={e => pageRef.current.prev()}></button>
                <div className="album">
                    <Carousel dots={false} ref={pageRef}>
                        {
                            [0, 1].map(item => {
                                return (
                                    <div key={item} className="page">
                                    {
                                        newAlbum.slice(item * 5 ,(item + 1) * 5).map(iten => {
                                        return <AlbumCover key={iten.id} 
                                                           info={iten} 
                                                           size={100} 
                                                           width={118} 
                                                           bgp="-570px" />
                                        })
                                    }
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <button className='arrow arrow-right sprite_02'
                    onClick={e => pageRef.current.next()}></button>
            </div>
        </AlbumWrapper>
            
    )
})
