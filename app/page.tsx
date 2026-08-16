import Link from "next/link";

/* 暂时隐藏的示例文章数据，后续有真实文章时可直接取消注释。
const notes = [
  {
    date: "2026.07.28",
    category: "旅行手记",
    readTime: "8 分钟",
    title: "在潮州，沿着韩江走到天黑",
    excerpt: "从牌坊街出发，没有目的地。一路经过老店、渡口和傍晚的风，最后坐在江边看天色慢慢沉下来。",
    className: "note-chaozhou",
    index: "01",
  },
  {
    date: "2026.07.12",
    category: "生活日常",
    readTime: "5 分钟",
    title: "搬家以后，我重新学习怎么生活",
    excerpt: "一张桌子、三盆植物和一扇朝东的窗。新空间没有立刻变成家，但生活已经开始在里面留下痕迹。",
    className: "note-home",
    index: "02",
  },
  {
    date: "2026.06.30",
    category: "未来计划",
    readTime: "6 分钟",
    title: "下一段路：写给 2026 下半年的计划",
    excerpt: "少一点匆忙，多一点真正想做的事。继续写作，学会游泳，再去一个从没认真看过的地方。",
    className: "note-plan",
    index: "03",
  },
];
*/

export default function Home() {
  return (
    <main id="top">
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Back to top">
          与航<span>。</span>
        </a>
        <div className="nav-links">
          {/* 暂时隐藏尚未启用的内容入口，后续可直接恢复。
          <a href="#notes">文章</a>
          <a href="#about">关于</a>
          <a href="#plans">计划</a>
          */}
          <Link href="/">Home</Link>
          <a href="#apps">Apps</a>
        </div>
        <div className="nav-actions">
          <button className="language-switch" type="button" disabled data-future-path="/cn" aria-label="Chinese version coming soon">中文</button>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-meta">
              <span>ISSUE 08 · 2026</span>
            </div>
            <h1 id="hero-title">
              Places I’ve been,
              <em>days as they unfold.</em>
            </h1>
            {/* 原文章入口暂时保留，恢复文章栏目时可重新启用。
            <a href="#notes">Read the latest notes <span aria-hidden="true">↓</span></a>
            */}
          </div>
          <div className="hero-poster">
            <img
              src="/hero-yuhang-temple.jpg"
              alt="A hand-drawn travel portrait of Yu Hang and a friend at the Temple of Heaven"
              width={1086}
              height={1448}
            />
          </div>
        </div>
      </section>

      {/* 暂时隐藏的示例内容：文章、关于与计划。保留源码，待真实内容准备好后恢复。
      <section className="notes-section" id="notes" aria-labelledby="notes-title">
        <header className="section-header">
          <div>
            <span className="eyebrow">RECENT NOTES / 最近文章</span>
            <h2 id="notes-title">最近写下的</h2>
          </div>
          <p>生活不是宏大的叙事，而是许多个愿意停下来多看一眼的时刻。</p>
        </header>

        <div className="featured-note">
          <div className="featured-visual" aria-hidden="true">
            <span className="train-window window-one" />
            <span className="train-window window-two" />
            <span className="train-window window-three" />
            <span className="coast-line" />
            <span className="featured-stamp">JOURNAL<br />VOL. 08</span>
          </div>
          <article className="featured-copy">
            <div className="note-meta"><span>置顶 · 旅行手记</span><span>2026.08.03</span></div>
            <h3>沿着海岸线，<br />坐一趟没有终点的慢车</h3>
            <p>车窗外的海反复出现又消失。那天我没有列计划，只在每一次临时起意的停留里，重新认识时间。</p>
            <div className="read-label">阅读时间 10 分钟 <span aria-hidden="true">↗</span></div>
          </article>
        </div>

        <div className="note-list">
          {notes.map((note) => (
            <article className="note-row" key={note.index}>
              <div className={`note-art ${note.className}`} aria-hidden="true">
                <span className="note-index">{note.index}</span>
                {note.index === "01" && <><i className="bridge" /><i className="river" /><b>潮州</b></>}
                {note.index === "02" && <><i className="room-window" /><i className="room-table" /><b>HOME</b></>}
                {note.index === "03" && <><i className="plan-orbit" /><i className="plan-dot" /><b>02/02</b></>}
              </div>
              <div className="note-copy">
                <div className="note-meta"><span>{note.category}</span><span>{note.date}</span></div>
                <h3>{note.title}</h3>
                <p>{note.excerpt}</p>
                <div className="read-label">阅读时间 {note.readTime} <span aria-hidden="true">↗</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-title">
          <span className="eyebrow light">ABOUT / 关于与航</span>
          <h2 id="about-title">在确定与不确定之间，<br /><em>认真生活。</em></h2>
        </div>
        <div className="about-content">
          <div className="portrait-card" aria-label="与航的抽象人物肖像">
            <div className="portrait-sky" />
            <div className="portrait-face" />
            <div className="portrait-shirt" />
            <span>YH / 2026</span>
          </div>
          <div className="about-copy">
            <p className="about-lead">你好，我是与航。喜欢把脚步放慢，也喜欢偶尔出发去很远的地方。</p>
            <p>我用文字保存那些容易被忘记的部分：一顿普通的晚饭、陌生城市的清晨、一个念头从出现到成形的过程。</p>
            <p>这个网站是我的公开笔记本。没有固定更新频率，也不追求面面俱到，只写此刻真正关心的事。</p>
            <a href="mailto:hello@inbsu.com">hello@inbsu.com ↗</a>
          </div>
          <div className="now-list">
            <h3>此刻 / NOW</h3>
            <div><span>正在读</span><strong>《远山淡影》</strong></div>
            <div><span>正在学</span><strong>自由泳换气</strong></div>
            <div><span>下一站</span><strong>大理 · 九月</strong></div>
            <div><span>循环播放</span><strong>橘子海</strong></div>
            <small>最后更新：2026.08.12</small>
          </div>
        </div>
      </section>

      <section className="plans-section" id="plans" aria-labelledby="plans-title">
        <header className="plans-heading">
          <span className="eyebrow">PLANS / 接下来</span>
          <h2 id="plans-title">把愿望写具体，<br />然后慢慢靠近。</h2>
        </header>
        <div className="plans-grid">
          <article>
            <span className="plan-number">01</span>
            <p className="plan-state doing">进行中</p>
            <h3>每月写两篇文章</h3>
            <p>不为凑数，只为了持续观察和表达。</p>
            <div className="progress"><i style={{ width: "68%" }} /></div>
            <small>68% · 今年已完成 11 篇</small>
          </article>
          <article>
            <span className="plan-number">02</span>
            <p className="plan-state">九月出发</p>
            <h3>在云南住一个月</h3>
            <p>带更少的行李，尝试建立一种新的日常。</p>
            <div className="progress"><i style={{ width: "42%" }} /></div>
            <small>42% · 路线正在准备</small>
          </article>
          <article>
            <span className="plan-number">03</span>
            <p className="plan-state">慢慢完成</p>
            <h3>做一本旅行小书</h3>
            <p>整理照片、车票和路上没有发出的文字。</p>
            <div className="progress"><i style={{ width: "25%" }} /></div>
            <small>25% · 已完成目录</small>
          </article>
        </div>
      </section>
      */}

      <section className="apps-section" id="apps" aria-labelledby="apps-title">
        <header className="apps-heading">
          <span className="eyebrow light">MY APPS</span>
          <div>
            <h2 id="apps-title">Self-hosted, <em>made for everyday use.</em></h2>
          </div>
        </header>
        <div className="apps-grid">
          <article className="app-card app-relay">
            <div className="app-card-top">
              <span>01</span>
              <a href="https://docs.sanaei.dev/" target="_blank" rel="noreferrer" aria-label="Visit the official 3X-UI website">POWERED BY 3X-UI ↗</a>
            </div>
            <div className="app-mark mark-relay" aria-hidden="true"><i /><b /></div>
            <div className="app-card-copy">
              <h3><a href="https://relay.inbsu.com" target="_blank" rel="noreferrer">Relay</a></h3>
              <p>Wander the World.</p>
              <a className="app-domain" href="https://relay.inbsu.com" target="_blank" rel="noreferrer" aria-label="Open Relay in a new tab">
                <span>relay.inbsu.com</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className="app-card app-photos">
            <div className="app-card-top">
              <span>02</span>
              <a href="https://immich.app/" target="_blank" rel="noreferrer" aria-label="Visit the official Immich website">POWERED BY IMMICH ↗</a>
            </div>
            <div className="app-mark mark-photos" aria-hidden="true"><i /><b /></div>
            <div className="app-card-copy">
              <h3><a href="https://photos.inbsu.com" target="_blank" rel="noreferrer">Photos</a></h3>
              <p>Revisit the Past.</p>
              <a className="app-domain" href="https://photos.inbsu.com" target="_blank" rel="noreferrer" aria-label="Open Photos in a new tab">
                <span>photos.inbsu.com</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className="app-card app-media">
            <div className="app-card-top">
              <span>03</span>
              <a href="https://jellyfin.org/" target="_blank" rel="noreferrer" aria-label="Visit the official Jellyfin website">POWERED BY JELLYFIN ↗</a>
            </div>
            <div className="app-mark mark-videos" aria-hidden="true" />
            <div className="app-card-copy">
              <h3><a href="https://v.inbsu.com" target="_blank" rel="noreferrer">Videos</a></h3>
              <p>Hold What I Love Close.</p>
              <a className="app-domain" href="https://v.inbsu.com" target="_blank" rel="noreferrer" aria-label="Open Videos in a new tab">
                <span>v.inbsu.com</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* 暂时隐藏的大块联系栏目，邮箱入口仍保留在顶部导航中。
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <span className="eyebrow">SAY HELLO / 写封信</span>
        <h2 id="contact-title">如果你也在路上，<br /><em>欢迎来信。</em></h2>
        <div className="contact-row">
          <p>分享一本书、一段旅程，或者只是打声招呼。</p>
          <a href="mailto:hello@inbsu.com">hello@inbsu.com <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      */}

      <footer>
        <p>© 2026 与航</p>
        <p>INBSU.COM · 向前看</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
