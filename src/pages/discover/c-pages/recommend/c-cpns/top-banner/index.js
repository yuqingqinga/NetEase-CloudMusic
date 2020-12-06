import React, { memo ,useEffect,useState,useRef,useCallback} from 'react';
import axios from 'axios';
import { BannerLeft, BannerWrapper,BannerRight ,BannerControl} from './style';

import { Carousel } from 'antd';

export default memo(function TopBanner() {
    const [topBanner,setTopBanner] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
    
    // 其他Hooks
    useEffect(() => {
        axios({
            url:'http://123.207.32.32:9001/banner'
        }).then(res => {
            setTopBanner(res.data.banners);
        })
     }, []);
    const bannerRef = useRef();
    const bannerChange = useCallback((from,to) => {
       setCurrentIndex(to);
    },[])

    // 其他业务逻辑
    //当topBanner数组为不为空时，取地址
    const bgImage = topBanner[currentIndex] && (topBanner[currentIndex].imageUrl + "?imageView&blur=40x20"); 

    return (
       <BannerWrapper  bgImage={bgImage}>
           <div className="banner wrap-v2">
              <BannerLeft>
                <Carousel effect="fade" autoplay="true" ref={bannerRef} beforeChange={bannerChange}>
                {
                    topBanner.map((item,index) => {
                        return (
                            <div className="banner-item" key={item.imageUrl}>
                                <img className="image" src={item.imageUrl} alt={item.typeTitle}/>
                            </div>
                        )
                    })
                }
                </Carousel>
              </BannerLeft>
              <BannerRight></BannerRight>
              <BannerControl>
                  <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
                  <button className="btn right" onClick={e => bannerRef.current.next()}></button>
              </BannerControl>
           </div>
       </BannerWrapper>
    )
})
