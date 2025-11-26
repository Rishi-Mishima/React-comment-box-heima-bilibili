import { tab } from '@testing-library/user-event/dist/tab'
import './App.scss'
import avatar from './images/bozai.png'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 140,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar: './images/image.png',
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]

// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

//--------------
// 1. // 渲染评论列表




const App = () => {
  // 渲染评论列表
  const [commentList, setCommentList] = useState(defaultList)

  //sorting animation 
  const [isSorting, setIsSorting] = useState(false)

  // delete 
  const handleDel = (id) => {
    console.log(id);//1 
    // commentList 

    setCommentList(commentList.filter(item => item.rpid !== id))

  }

  const [newType, setType] = useState('hot')
  // tab change - click

  const handleTabChange = (newType) => {
    console.log(newType);
    setType(newType)

    // 拷贝一份（不能直接对 state 排序，会导致 Bug）
    const newList = [...commentList]

    // 列表排序
    //lodash 
    if (newType === 'hot') {
      // 最热：
      // 1️⃣ 先按 like 降序
      // 2️⃣ 如果 like 相同，再按时间降序（新的在前）

      newList.sort((a, b) => {
        if (b.like !== a.like) {
          return b.like - a.like
        }

        // like 相同时，按时间（ctime）降序
        return new Date(b.ctime) - new Date(a.ctime)
      })

    } else if (newType === 'time') {
      // 最新：
      // 1️⃣ 先按时间降序
      // 2️⃣ 如果时间一样，再按 like 降序（点赞多的排前）

      newList.sort((a, b) => {
        const timeDiff = new Date(b.ctime) - new Date(a.ctime)
        if (timeDiff !== 0) {
          return timeDiff
        }
        return b.like - a.like
      })
    }

    // 更新列表
    setCommentList(newList)

    // 🔥 触发一次排序动画
    setIsSorting(true)
    setTimeout(() => {
      setIsSorting(false)
    }, 250) // 跟 CSS 动画时长对齐
  }

  // 捕捉评论输入
  const [value, setInput] = useState("")

  const publishComment = () => {
    console.log(value);
    const newId = new Date().getTime()
    setCommentList([
      ...commentList, {
        rpid: newId,
        user: {
          uid: '36080105',
          avatar: '',
          uname: '许嵩',
        },
        content: value,
        ctime: dayjs(new Date()).format('MM-DD hh:mm'),
        like: 88,
      },
    ])

    // 清空输入框内容
    setInput("")
  }


  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item =>
            (<span key={item.type}
              // className={`nav-item ${newType === item.type && 'active'}`}
              className={classNames('nav-item', { active: newType === item.type })}
              onClick={() => handleTabChange(item.type)
              } >{item.text}</span>))}


          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={value}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={publishComment}>
              <div className="send-text" >发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className={`reply-list ${isSorting ? 'sorting' : ''}`}>
          {/* 评论项 */}

          {commentList.map(item => (<div key={item.rpid} className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                  src={item.user.avatar}
                />
              </div>
            </div>

            <div className="content-wrap">
              {/* 用户名 */}
              <div className="user-info">
                <div className="user-name">{item.user.uname}</div>
              </div>
              {/* 评论内容 */}
              <div className="root-reply">
                <span className="reply-content">{item.content}</span>
                <div className="reply-info">
                  {/* 评论时间 */}
                  <span className="reply-time">{item.ctime}</span>
                  {/* 评论数量 */}
                  <span className="reply-time">点赞数:{item.like}</span>

                  {user.uid === item.user.uid &&
                    <span className="delete-btn" onClick={() => handleDel(item.rpid)}>
                      删除
                    </span>}


                </div>
              </div>
            </div>
          </div>))}

        </div>
      </div>
    </div>
  )
}

export default App