# tinymce-vue-plugins

This is tinymce vue plugins

## 前言

先睹为快可访问：

https://tinymce-plugin.github.io/

https://tinymce-plugin.gitee.io/

https://tinymce-plugin.vercel.app/

[tinymce 官方文档](https://www.tiny.cloud/docs/)

[tinymce 中文文档](http://tinymce.ax-z.cn/)

## 简述

This is tinymce plugins 该项目主要为 tinymce 富文本编译器的扩展插件，或增强优化插件目前整理完成插件列表如下：

-   [x] attachment: 附件上传。拥有附件类型对应图标，支持 vue;

## 下载(强烈建议)

```bash
 npm i tinymce-vue-plugins 或 cnpm i tinymce-vue-plugins -D
```

## 使用说明

未使用过 tinymce ，可以查看莫若卿大佬的 [tinymce 中文文档 ](http://tinymce.ax-z.cn/)

#### axupimgs（Vue）使用方法：

```javascript
tinymce.init({
    selector: '#tinydemo',
    plugins: 'axupimgs',
    toolbar: 'axupimgs',
});
```

[点击下载](https://github.com/Five-great/tinymce-plugins/releases/download/0.0.5/axupimgs.rar) [更多下载](https://github.com/Five-great/tinymce-plugins/releases/tag/0.0.5)

更多配置 见 [插件 / axupimgs](http://tinymce.ax-z.cn/more-plugins/axupimgs.php)

#### attachment 使用方法：

```javascript
tinymce.init({
    selector: '#tinydemo',
    plugins: 'attachment',
    toolbar: 'attachment',
});
```

[点击下载](https://github.com/Five-great/tinymce-plugins/releases/download/0.0.5/attachment.rar) [更多下载](https://github.com/Five-great/tinymce-plugins/releases/tag/0.0.5)

更多配置(选配) :

提供 `attachment` 插件 提供 `attachment_max_size`，`attachment_style`,`attachment_icons_path`,`attachment_upload_handler` 配置参数 attachment_max_size: 附件大小限制 默认 209715200 （200M）【number】 attachment_style: 附件的样式，主要为保存数据后可以直接在其他页面展示。 【string】 attachment_icons_path： 附件的 图标的路径 icons ， 默认 当前路径 `Vue` 默认 'https://unpkg.com/@npkg/tinymce-plugins/plugins/attachment/icons' attachment_upload_handler： 附件上传处理函数 【function】 function(file, succFun, failFun, progressCallback)

1. file : 文件对象【file】
2. succFun : 成功回调函数 传入 (url|string)
3. failFun : 失败回调函数 传入 (string)
4. progressCallback: 进程回调函数 传入 (string)

```javascript

```

# 基于 tinymce 的附件上传插件

### 插件特点

1. 简单，没有那么多花里胡哨的 UI
2. 支持上传的进度
3. 支持拖拽上传，不影响原图片插件的拖拽

![img](https://raw.githubusercontent.com/NebulaStudio/tinymce_attachment_plugin/master/attachment.gif)

### 如何使用

使用此插件，需要关注 4 个参数配置

#### 1. attachment_max_size: 可选参数，单个文件上传最大限制，单位 byte，默认 200 M

示例： 限制上传大小为 100M

```
tinymce.init({
    attachment_max_size: 100 * 1024 * 1024
});
```

#### 2. attachment_assets_path: 静态资源的路径，用于文件 icon 以及上传等待动画，上传错误的信息提示图标。PS: 静态资源位于项目的 /assets/icons 下。

示例:

```
tinymce.init({
    attachment_assets_path: 'assets/icons/'
});
```

#### 3. attachment_upload_handler: 上传的回调函数。

| 参数名           | 类型     | 说明                                       |
| ---------------- | -------- | ------------------------------------------ |
| file             | object   | 上传的文件对象                             |
| successCallback  | Function | 上传成功的回调函数, 参数为该文件下载地址。 |
| failureCallback  | Function | 上传失败的回调函数，参数为错误信息。       |
| progressCallback | Function | 上传进度回调函数，参数为进度的百分比。     |

以使用 axios 为例：

```
const axios = require('axios');
tinymce.init({
    attachment_upload_handler: upload(file, successCallback, failureCallback, progressCallback) {
        axios.post('/upload_hander', {
            data: file,
            onUploadProgress: function(e) {
                const progress = (e.loaded / e.total * 100 | 0) + '%';
                progressCallback(progress);
            }
        }).then((response) => {
            successCallback(response.data.url);
        }).catch((error) => {
            failureCallback(`上传失败:${error.message}`)
        });
    }
});
```

#### 4. 在初始化 tinymce 的 content_css 对应的样式文件中，添加 css 代码。

示例：如下配置文件

```
tinymce.init({
    content_css: 'tinymce/skins/content/snow/content.css',
});
```

则需要在 tinymce/skins/content/snow/content.css 文件中添加如下 css 即可：

```
.attachment {
    cursor: pointer !important;
}
.upload_error {
    background: #FFE5E0;
    border: 1px solid #EA644A;
}
.attachment > img {
    width: 16px;
    vertical-align: middle;
    padding-right:4px;
}
.attachment > a {
    text-decoration: none;
    vertical-align: middle;
}

.attachment > span {
    vertical-align: middle;
    padding-right:4px;
}
```

# License

MIT

#### 引入

可以全部引入

```javascript
import 'tinymce-vue-plugins';
```

也可以按需引入

```javascript
import 'tinymce-vue-plugins/tinymce-attachment-plugin';
```
