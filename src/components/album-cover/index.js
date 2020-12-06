import React, { memo } from 'react'
import { AlbumWrapper } from './style';

import {getSizeImage} from '@/utils/format-utils'

export default memo(function AlbumCover(props) {

    const {info, size = 130 ,width = 153, bgp="-845px"}  = props;

    return (
        <AlbumWrapper size={size} width={width} bgp={bgp}>
            <div className="album-image">
                <img src={getSizeImage(info.picUrl,)} alt=''/>
                <a  href='/todo' className="cover image_cover"></a>
            </div>
            <div className="album-info">
                <div className="name test-nowrap">{info.name}</div>
                <div className="artist test-nowrap">{info.artist.name}</div>
            </div>
        </AlbumWrapper>
    )
})
