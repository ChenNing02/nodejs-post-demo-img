# 利用Img发请求


## 启动

```sh
node server.js 8888
```

## 功能概述

使用 nodejs 做后台判断，每次加载页面(`./`)请求 db 文件的数据，当点击 付款 的 button 按钮时，发送一个地址为`/pay` 的 `get` 请求，请求一个 img 图片，nodejs 后台判断请求为 `/pay` 时修改 db 文件，将 db 文件中的数字减一

## 前端功能

### 利用图片请求成功或失败给用户提示

当图片请求成功时提示用户请求成功，并将付款后的值减一。当图片请求失败时，提示用户请求失败

```js
images.onload = function(){
	alert('付款成功')
    window.location.reload()
    amount.innerText = amount.innerText - 1
}
images.onerror = function(){
    alert('付款失败')
}
```

### 刷新当前页面

```js
window.location.reload()
```

## nodejs 功能

### `response.setHeader()`

**方法说明：**

设置请求/响应头文件信息。

如果将要发送的信息已包含头文件，执行该方法后头文件的值将被改写。

如果一个头文件需要传递多个值，可以使用数组。

**语法：**

```js
response.setHeader(name, value)
// name: http 协议名称，value: 文件类型
```

## iframe标签

作用：在页面中添加一个 iframe 标签，用来承载 form 表单提交后展示的结果 在 target 的中添加 iframe 中 name 对应的属性

```html
<form action="/pay" method="POST" target="result">
    <input type="submit" value="付款">
</form>
<iframe name="result" src="about:blank" frameborder="0" height="100"></iframe>
```

