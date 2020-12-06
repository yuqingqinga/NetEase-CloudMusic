import React, { memo, useEffect, useRef, useState,useCallback } from 'react';

import TopRanking from '@/components/top-ranking';
import { PlayBarWrapper,Control, PlayInfo, Operator } from './style';
import { Slider,message } from 'antd';
import axios from 'axios';
import { getSizeImage ,formatDate,getPlayUrl,getMusicUrl} from '@/utils/format-utils';
import { NavLink } from 'react-router-dom';
import { parseLyric } from '@/utils/lrc-parse'
import eventBus from '@/services/recommend';


export default memo(function AppPlayerBar() {
    // 保存当前正在播放音乐信息
    const [currentSong, setCurrent] = useState([{
        "name": "偏爱",
        "id": 1397674264,
        "pst": 0,
        "t": 0,
        "ar": [{
            "id": 12493781,
            "name": "Lil Ghost小鬼",
            "tns": [],
            "alias": []
        }],
        "alia": [],
        "pop": 100,
        "st": 0,
        "rt": "",
        "fee": 8,
        "v": 3,
        "crbt": null,
        "cf": "",
        "al": {
            "id": 82523759,
            "name": "偏爱",
            "picUrl": "https://p1.music.126.net/vBh8GAFu4TkHSF0_rzvzgA==/109951164434010879.jpg",
            "tns": [],
            "pic_str": "109951164434010879",
            "pic": 109951164434010880
        },
        "dt": 210512,
        "h": {
            "br": 320000,
            "fid": 0,
               "size": 8423085,
            "vd": -51028
        },
        "m": {
            "br": 192000,
            "fid": 0,
            "size": 5053869,
            "vd": -48420
        },
        "l": {
            "br": 128000,
            "fid": 0,
            "size": 3369261,
            "vd": -46722
        },
        "a": null,
        "cd": "01",
        "no": 1,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 0,
        "s_id": 0,
        "mark": 8192,
        "originCoverType": 0,
         "single": 0,
        "noCopyrightRcmd": null,
        "mst": 9,
        "cp": 1416457,
        "mv": 0,
        "rtype": 0,
        "rurl": null,
        "publishTime": 0
    }]);

    // 保存音乐播放时间数据
    const [currentTime, setCurrentTime] = useState(0);
    //保存进度条数据
    const [progress, setProgress] = useState(0);
    // 控制当前进度条是否正在改变
    const [isChanging, setIsChanging] = useState(false);
    //判断当前音乐是否正在播放
    const [isPlaying, setIsPlaying] = useState(false);
    //歌曲的id，通过id获取歌曲详细信息
    const [id, setId] = useState(0);

    //当前歌曲索引，通过它来切换
    let [currentSongIndex,setCurrentSongIndex] = useState(0)
    //图片url
    const [picUrl ,setPicUrl] = useState('');
     //歌手名称
    const [singerName,setSingerName] = useState('');
    //歌曲时长
    const [duration,setDuration] = useState(0);
    //歌曲名字
    const [songName,setSongName]=useState('');
    //播放列表
    const [playList, setPlayList] = useState([
        {
            "name": "偏爱",
            "id": 1397674264,
            "pst": 0,
            "t": 0,
            "ar": [{
                "id": 12493781,
                "name": "Lil Ghost小鬼",
                "tns": [],
                "alias": []
            }],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 3,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 82523759,
                "name": "偏爱",
                "picUrl": "https://p1.music.126.net/vBh8GAFu4TkHSF0_rzvzgA==/109951164434010879.jpg",
                "tns": [],
                "pic_str": "109951164434010879",
                "pic": 109951164434010880
            },
            "dt": 210512,
            "h": {
                "br": 320000,
                "fid": 0,
                   "size": 8423085,
                "vd": -51028
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 5053869,
                "vd": -48420
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3369261,
                "vd": -46722
            },
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 0,
             "single": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 1416457,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "publishTime": 0
        },
        {
            "name": "有何不可",
            "id": 167876,
            "pst": 0,
            "t": 0,
            "ar": [
            {
                "id": 5771,
                "name": "许嵩",
                "tns": [],
                "alias": []
            }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000007916021",
            "fee": 8,
            "v": 49,
            "crbt": null,
            "cf": "",
            "al": {
            "id": 16953,
            "name": "自定义",
            "picUrl": "https://p2.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg",
            "tns": [],
            "pic_str": "18590542604286213",
            "pic": 18590542604286212
            },
            "dt": 241840,
            "h": {
            "br": 320000,
            "fid": 0,
            "size": 9675799,
            "vd": -21099
            },
            "m": {
            "br": 192000,
            "fid": 0,
            "size": 5805497,
            "vd": -18400
            },
            "l": {
            "br": 128000,
            "fid": 0,
            "size": 3870346,
            "vd": -16900
            },
            "a": null,
            "cd": "1",
            "no": 3,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 0,
            "single": 0,
            "noCopyrightRcmd": null,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 14026,
            "publishTime": 1231516800000
        },
        {
            "name": "嚣张",
            "id": 1382596189,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 32220939,
                "name": "en",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 10,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 80816891,
              "name": "嚣张",
              "picUrl": "https://p2.music.126.net/NhkuFBphLFaSmYMeW1-frQ==/109951164271814514.jpg",
              "tns": [],
              "pic_str": "109951164271814514",
              "pic": 109951164271814510
            },
            "dt": 253994,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 10162605,
              "vd": -55669
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 6097581,
              "vd": -53082
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4065069,
              "vd": -51369
            },
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 0,
            "originCoverType": 0,
            "single": 0,
            "noCopyrightRcmd": null,
            "mv": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 1372818,
            "publishTime": 0
          }
    ]);
    //播放顺序 //0循环播放 1随机播放 -1单曲循环
    const [sequence,setSequence]=useState(0);
     //歌词列表
    const [lyric,setLyric] = useState([]);
     //当前歌词索引
    const [currentLyricIndex,setCurrentLyricIndex] = useState(0);

    //播放音乐
    useEffect(() => {
        axios({
            url:`http://123.207.32.32:9001/song/detail?ids=${playList[currentSongIndex].id}`
        }).then(res => {
            setCurrent(res.data.songs);   
            //图片url
            const picUrl = (res.data.songs[0].al &&res.data.songs[0].al.picUrl) || "";
            //歌曲名称
            const SongName = (res.data.songs[0] && res.data.songs[0].name) || "啦啦";
            //歌手名称
            const  name = (res.data.songs[0].ar && res.data.songs[0].ar[0].name) || "未知歌手";
            // 当前音乐的总时长(s)
            const duration = (res.data.songs[0].dt) || 0;

            setPicUrl(picUrl);
            setSongName(SongName);
            setSingerName(name);
            setDuration(duration);
        })  
    }, [playList[currentSongIndex].id])
    // console.log(currentSong);

    //通过事件总线传入的事件
    eventBus.addListener('addMusic',(musicId) => {
        setId(musicId);
    })
    // console.log(id);
    

    //点击榜单内其他音乐时获取其信息，并将其添加到platList列表内
    const getSongDetail =  (id) => {
        const play_list = playList;
        const  index = play_list.findIndex((song) => song.id === id);
        //在playList找到了歌曲
        let song = null;
        // console.log(id);
        if(index !== -1){
            setCurrentSongIndex(index);
            song = playList[index];
            setCurrent(song);
            // console.log(song);
        }
        else{
            axios({
                url:`http://123.207.32.32:9001/song/detail?ids=${id}`
            }).then(res => {
                const song = res.data.songs && res.data.songs[0];
                if(!song){
                    return;
                }
                const newPlayList = [...playList];
                newPlayList.push(song);
                getLyric(playList[currentSongIndex].id)
                //更改播放列表，索引以及当前的歌曲
                setPlayList(newPlayList);
                setCurrentSongIndex(newPlayList.length-1)
                setCurrent(song);
                // console.log(song);        
            })
        }
    }
    // console.log(playList);
    // console.log(singerName);
    // console.log(currentSong);
    // console.log(currentSongIndex);
    // console.log(playList[currentSongIndex].id);

    useEffect(() => {
        getSongDetail(id);
        getLyric(id);
    },[id])

    const audioRef = useRef();
    //handle function
    // 点击事件
    const playMusic = useCallback(() => {
         //播放音乐
        audioRef.current.src = getPlayUrl(playList[currentSongIndex].id);
        getLyric(playList[currentSongIndex].id);
        // console.log(audioRef.current.src);
        if(!isPlaying){ // 播放音乐
            audioRef.current.play();
            // console.log("播放");
        }
        else{   //暂停音乐
            audioRef.current.pause();
            // console.log("暂停");
        } 
        setIsPlaying(!isPlaying);
        // console.log(isPlaying);
    },[playList[currentSongIndex].id,isPlaying ]);


    //当前音乐播放时
    const timeUpdate = (e) => {
        // console.log(e.target.currentTime);
        // e.target.currentTime(获得当前播放音乐的进度时间) *1000 转换为毫秒
        setCurrentTime( e.target.currentTime);
        const currentTime  = e.target.currentTime;
        if(!isChanging){
            setCurrentTime(currentTime * 1000);
            setProgress(currentTime* 1000 / duration * 100);
        }

        //展示歌词
        let lrcLength = lyric.length;
        let i=0;
        for(; i < lrcLength; i++){
            let lyricItem = lyric[i].time;
            if(currentTime* 1000 <lyricItem){
                break;
            }  
        }   
        const finalIndex = i - 1; 
        if( finalIndex!==currentLyricIndex){
            setCurrentLyricIndex(finalIndex);
            // antd组件
            let content = lyric[i-1] || " "
            message.open({
            key:'lyric',
            content:content.content ||" ",
            duration:0,
            className: 'lyric-message',
            type:"success"
            })   
        } 
    }

    // 滑动中的位置
    const sliderChange = useCallback((value) => {
        setIsChanging(true);
        // 滑动滚动条时，实时更新时间的改变
        const currentTime = value /100 * duration;
        setCurrentTime(currentTime);
        setProgress(value); 
    },[duration]);
    // console.log("change:",progress);

    //滑动结束后的位置
    const sliderAfterChange = useCallback( (value) => {
        //互动进度条后的进度条时间
        const currentTime = value / 100 * duration /1000; 
        audioRef.current.currentTime =  currentTime;
        // 重新更新进度条时间
        setCurrentTime(currentTime * 1000);
        setIsChanging(false);
        //如果没有播放音乐，当滑动滚动条后开始播放音乐
        if(!isPlaying){
            playMusic();
        }
    }, [duration, isPlaying,playMusic] )

    //点击播放顺序改变图标样式 事件
    const changeSequence = () => {
        let currentSequence = sequence + 1;
        if(currentSequence > 2){
            setSequence(0);
        }else{
            setSequence(currentSequence);
        }
    }
    // 改变播放顺序
    const changeMusic = (tag) => {
        switch (sequence) {
            case 1: //随机
              currentSongIndex = Math.floor(Math.random() * playList.length);
              break;
            case 2:
              currentSongIndex = currentSongIndex;
              break;
            default://顺序
              currentSongIndex += tag;
              if (currentSongIndex === playList.length) currentSongIndex = 0; 
              if (currentSongIndex === -1) currentSongIndex = playList.length - 1;
        }
       change(); 
       setCurrent(playList[currentSongIndex]);
       setCurrentSongIndex(currentSongIndex)
       getLyric(playList[currentSongIndex].id); 
       audioRef.current.play()
    }
    //播放改变的音乐
    const change = ()=>{
        audioRef.current.src = getPlayUrl(playList[currentSongIndex].id)
    }

    // 歌曲结束后自动切换
    const handleMusicEnded=()=>{
        if (sequence === 2 || playList.length === 1) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }else{
          changeMusic(1)
        }
    } 
    

    //获取歌词
    const getLyric = (id)=>{
       axios({
           url:`http://123.207.32.32:9001/lyric?id=${id}`
       }).then(res => {
            // 付费歌获取不到歌词
           if(res.data.uncollected){
                return;
           }
           const lyric = res.data.lrc.lyric;
           //解析歌词
           const lyricList = parseLyric(lyric);
           setLyric(lyricList);
       })
    }

    return (
        <PlayBarWrapper className="sprite_playbar">
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                <button className="sprite_playbar btn prev" 
                         onClick={e=>changeMusic(-1)}></button>
                <button className="sprite_playbar btn play"  
                        onClick={e => playMusic()}></button>
                <button className="sprite_playbar btn next" 
                        onClick={e=>changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                <div className="image">
                    <NavLink to='/discover/player'>
                        <img src={getSizeImage(picUrl,35)} alt="" />    
                    </NavLink>
                </div>
                <div className="info">
                    <div className="song">
                    <span className="song-name">{songName}</span>
                    <span className="singer-name">{singerName}</span>
                    </div>
                    <div className="progress">
                        {/* 滑块 */}
                    <Slider defaultValue={progress} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange}/>
                    <div className="time">
                        <span className="now-time">{formatDate(currentTime,"mm:ss")}</span>
                        <span className="divider">/</span>
                        <span className="total-time">{formatDate(duration,"mm:ss")}</span>
                    </div>
                    </div>
                </div>
                </PlayInfo>
                <Operator sequence={sequence} >
                <div className="left">
                    <button className="sprite_playbar btn favor"></button>
                    <button className="sprite_playbar btn share"></button>
                </div>
                <div className="right sprite_playbar">
                    <button className="sprite_playbar btn volume"></button>
                    <button className="sprite_playbar btn loop" 
                            onClick={ e => changeSequence()}>
                            
                    </button>
                    <button className="sprite_playbar btn playlist" >{playList.length} </button>
                </div>
                </Operator>
            </div>
        <audio ref={audioRef}  onTimeUpdate={timeUpdate} onEnded={handleMusicEnded}/>
        </PlayBarWrapper>
    )
})
