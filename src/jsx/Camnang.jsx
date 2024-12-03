import React from "react";
import { Link } from 'react-router-dom';
// import './camnang.css';
const CamNang = () => {
  return (
    <main className="wrapperMain_content">
      <div className="danh">12233</div>
      <div className="layout-blogs">
        <div className="breadcrumb-shop">
          <div className="min_warp2 ">
            <div className="breadcrumb-list  ">
              <ol
                className="breadcrumb breadcrumb-arrows"
                itemscope
                itemtype="http://schema.org/BreadcrumbList"
              >
                <li
                  itemprop="itemListElement"
                  itemscope
                  itemtype="http://schema.org/ListItem"
                >
                  <Link to="/" target="_self" itemprop="item">
                    <span itemprop="name">Trang chủ</span>
                  </Link>
                  <meta itemprop="position" content="1" />
                </li>

                <li
                  className="active"
                  itemprop="itemListElement"
                  itemscope
                  itemtype="http://schema.org/ListItem"
                >
                  <span
                    itemprop="item"
                    content="https://maple-inn.myharavan.com/blogs/news"
                  >
                    <strong itemprop="name">Tin tức</strong>
                  </span>
                  <meta itemprop="position" content="2" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="wrapper-contentBlogs">
          <div className="min_warp2 pd-top">
            <div className="row6 dFlex-row">
              <div className="col-lg-9 col-md-12 col-12 boxBlog-left">
                <div className="listBlogs-content">
                  <div className="heading-page">
                    <h1>Tin tức</h1>
                  </div>
                  <div className="list-article-content blog-posts row6">
                    {/* <!-- Begin: Nội dung blog --> */}

                    <article className="article-loop col-md-6 col-6 col_col ">
                      <div className="article-inner">
                        <div className="article-image">
                          <a
                            href="/blogs/news/paddling-tour"
                            className="blog-post-thumbnail"
                            title="Paddling Tour"
                            rel="nofollow"
                          >
                            <img
                              className="lazyload"
                              src="//file.hstatic.net/200000909393/article/img-69-800x600-1_3f16d7045e9a4dd49d5acc42384a3d5f_1024x1024.jpg"
                              alt="Paddling Tour"
                            />
                          </a>
                        </div>
                        <div className="article-detail">
                          <div className="article-title">
                            <h3 className="post-title">
                              <a
                                href="/blogs/news/paddling-tour"
                                title="Paddling Tour"
                              >
                                Paddling Tour
                              </a>
                            </h3>
                          </div>

                          <p className="entry-content">
                            Banff National Park’s biggest lake allows you to
                            paddle for miles and enjoy breathtaking views. Lorem
                            ipsum dolor sit amet.
                          </p>

                          <div className="article-post-meta">
                            <span className="author">bởi: Mai Nguyễn</span>
                            <span className="date">
                              <time pubdate datetime="22 Tháng 08, 2024">
                                22 Tháng 08, 2024
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="article-loop col-md-6 col-6 col_col">
                      <div className="article-inner">
                        <div className="article-image">
                          <a
                            href="/blogs/news/mountain-hiking"
                            className="blog-post-thumbnail"
                            title="Mountain Hiking"
                            rel="nofollow"
                          >
                            <img
                              className="lazyload"
                              src="//file.hstatic.net/200000909393/article/img-68_93702bac2c97447b9475c6bb07a485d8_grande.jpg"
                              alt="Mountain Hiking"
                            />
                          </a>
                        </div>
                        <div className="article-detail">
                          <div className="article-title">
                            <h3 className="post-title">
                              <a
                                href="/blogs/news/mountain-hiking"
                                title="Mountain Hiking"
                              >
                                Mountain Hiking
                              </a>
                            </h3>
                          </div>

                          <p className="entry-content">
                            With over 1,600 kilometres (994 miles) of trails,
                            Banff National Park offers adventurers some of the
                            best hiking on the planet.
                          </p>

                          <div className="article-post-meta">
                            <span className="author">bởi: Mai Nguyễn</span>
                            <span className="date">
                              <time pubdate datetime="22 Tháng 08, 2024">
                                22 Tháng 08, 2024
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="article-loop col-md-6 col-6 col_col">
                      <div className="article-inner">
                        <div className="article-image">
                          <a
                            href="/blogs/news/camping-tour"
                            className="blog-post-thumbnail"
                            title="Camping Tour"
                            rel="nofollow"
                          >
                            <img
                              className="lazyload"
                              src="//file.hstatic.net/200000909393/article/img-70_23537e350baa48c5b65a977c872d0b09_grande.jpg"
                              alt="Camping Tour"
                            />
                          </a>
                        </div>
                        <div className="article-detail">
                          <div className="article-title">
                            <h3 className="post-title">
                              <a
                                href="/blogs/news/camping-tour"
                                title="Camping Tour"
                              >
                                Camping Tour
                              </a>
                            </h3>
                          </div>

                          <p className="entry-content">
                            Banff offers a range of camping spots allowing you
                            to experience all of this most gorgeous park’s
                            outdoor splendour.
                          </p>

                          <div className="article-post-meta">
                            <span className="author">bởi: Mai Nguyễn</span>
                            <span className="date">
                              <time pubdate datetime="22 Tháng 08, 2024">
                                22 Tháng 08, 2024
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="article-loop col-md-6 col-6 col_col">
                      <div className="article-inner">
                        <div className="article-image">
                          <a
                            href="/blogs/news/rafting"
                            className="blog-post-thumbnail"
                            title="Rafting"
                            rel="nofollow"
                          >
                            <img
                              className="lazyload"
                              src="//file.hstatic.net/200000909393/article/firdouss-ross-thsw2pd2gx0-unsplash-550x413_5206e2334e6b4e858a6427694dbee09b_grande.jpg"
                              alt="Rafting"
                            />
                          </a>
                        </div>
                        <div className="article-detail">
                          <div className="article-title">
                            <h3 className="post-title">
                              <a href="/blogs/news/rafting" title="Rafting">
                                Rafting
                              </a>
                            </h3>
                          </div>

                          <p className="entry-content">
                            Banff offers a range of camping spots allowing you
                            to experience all of this most gorgeous park’s
                            outdoor splendour.
                          </p>

                          <div className="article-post-meta">
                            <span className="author">bởi: Mai Nguyễn</span>
                            <span className="date">
                              <time pubdate datetime="22 Tháng 08, 2024">
                                22 Tháng 08, 2024
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="pagination-shop pagi  text-center">
                    <div id="pagination">
                      <ul className="pagination">
                        <li>
                          <span className="current">1</span>
                        </li>
                        <li>
                          <a href="/blogs/news?page=2">2</a>
                        </li>
                        <li>
                          <a href="/blogs/news?page=2">
                            <i className="fa fa-angle-double-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-12 boxBlog-right">
                <aside className="sidebar-blogs blogs-aside--sticky">
                  {/* <!-- Bai viet moi nhat --> */}
                  <div className="group-sidebox">
                    <div className="sidebox-title ">
                      <h3 className="htitle">Bài viêt mới nhất</h3>
                    </div>
                    <div className="sidebox-content sidebox-content-togged">
                      <div className="list-blogs-latest">
                        <div className="item-article clearfix ">
                          <div className="post-image">
                            <a href="/blogs/news/paddling-tour">
                              <img
                                className="lazyload"
                                src="//file.hstatic.net/200000909393/article/img-69-800x600-1_3f16d7045e9a4dd49d5acc42384a3d5f_compact.jpg"
                                // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                alt="Paddling Tour"
                              />
                            </a>
                          </div>
                          <div className="post-content">
                            <h3>
                              <a href="/blogs/news/paddling-tour">
                                Paddling Tour
                              </a>
                            </h3>
                            <p className="post-meta">
                              <span className="cate">Tin tức</span>
                              <span className="author d-none">
                                <a href="/blogs/news/paddling-tour">
                                  Mai Nguyễn
                                </a>
                              </span>
                              <span className="date">- 22.08.2024</span>
                            </p>
                          </div>
                        </div>

                        <div className="item-article clearfix ">
                          <div className="post-image">
                            <a href="/blogs/news/mountain-hiking">
                              <img
                                className="lazyload"
                                src="//file.hstatic.net/200000909393/article/img-68_93702bac2c97447b9475c6bb07a485d8_compact.jpg"
                                // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                alt="Mountain Hiking"
                              />
                            </a>
                          </div>
                          <div className="post-content">
                            <h3>
                              <a href="/blogs/news/mountain-hiking">
                                Mountain Hiking
                              </a>
                            </h3>
                            <p className="post-meta">
                              <span className="cate">Tin tức</span>
                              <span className="author d-none">
                                <a href="/blogs/news/mountain-hiking">
                                  Mai Nguyễn
                                </a>
                              </span>
                              <span className="date">- 22.08.2024</span>
                            </p>
                          </div>
                        </div>

                        <div className="item-article clearfix ">
                          <div className="post-image">
                            <a href="/blogs/news/camping-tour">
                              <img
                                className="lazyload"
                                src="//file.hstatic.net/200000909393/article/img-70_23537e350baa48c5b65a977c872d0b09_compact.jpg"
                                // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                alt="Camping Tour"
                              />
                            </a>
                          </div>
                          <div className="post-content">
                            <h3>
                              <a href="/blogs/news/camping-tour">
                                Camping Tour
                              </a>
                            </h3>
                            <p className="post-meta">
                              <span className="cate">Tin tức</span>
                              <span className="author d-none">
                                <a href="/blogs/news/camping-tour">
                                  Mai Nguyễn
                                </a>
                              </span>
                              <span className="date">- 22.08.2024</span>
                            </p>
                          </div>
                        </div>

                        <div className="item-article clearfix ">
                          <div className="post-image">
                            <a href="/blogs/news/rafting">
                              <img
                                className="lazyload"
                                src="//file.hstatic.net/200000909393/article/firdouss-ross-thsw2pd2gx0-unsplash-550x413_5206e2334e6b4e858a6427694dbee09b_compact.jpg"
                                // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                alt="Rafting"
                              />
                            </a>
                          </div>
                          <div className="post-content">
                            <h3>
                              <a href="/blogs/news/rafting">Rafting</a>
                            </h3>
                            <p className="post-meta">
                              <span className="cate">Tin tức</span>
                              <span className="author d-none">
                                <a href="/blogs/news/rafting">Mai Nguyễn</a>
                              </span>
                              <span className="date">- 22.08.2024</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Menu bai viet --> */}

                  <div className="group-sidebox">
                    <div className="sidebox-title ">
                      <h3 className="htitle">Danh mục bài viết</h3>
                    </div>
                    <div className="sidebox-content sidebox-content-togged">
                      <ul className="menuList-links">
                        <li className="">
                          <a href="/" title="Trang chủ">
                            <span>Trang chủ</span>
                          </a>
                        </li>

                        <li className="">
                          <a href="/pages/about-us" title="Về Maple Inn">
                            <span>Về Maple Inn</span>
                          </a>
                        </li>

                        <li className="">
                          <a href="/pages/rooms" title="Phòng">
                            <span>Phòng</span>
                          </a>
                        </li>

                        <li className="has-submenu level0 ">
                          <a
                            href="/pages/nha-hang"
                            title="Dịch vụ tại Maple Inn"
                          >
                            Dịch vụ tại Maple Inn{" "}
                            <span className="icon-plus-submenu plus-nClick1"></span>
                          </a>
                          <ul className="submenu-links">
                            <li>
                              <a href="/pages/nha-hang" title="Nhà hàng">
                                Nhà hàng
                              </a>
                            </li>

                            <li>
                              <a
                                href="/pages/tiec-su-kien"
                                title="Tiệc & Sự kiện"
                              >
                                Tiệc & Sự kiện
                              </a>
                            </li>

                            <li>
                              <a
                                href="/pages/spa-massage"
                                title="Spa & Massage"
                              >
                                Spa & Massage
                              </a>
                            </li>
                          </ul>
                        </li>

                        <li className=" active ">
                          <a href="/blogs/news" title="Cẩm nang du lịch">
                            <span>Cẩm nang du lịch</span>
                          </a>
                        </li>

                        <li className="">
                          <a href="/pages/about-us" title="Giới thiệu">
                            <span>Giới thiệu</span>
                          </a>
                        </li>

                        <li className="">
                          <a href="/pages/lien-he" title="Liên hệ">
                            <span>Liên hệ</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CamNang;
