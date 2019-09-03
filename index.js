/**
 * Created by wonmo on 2019/9/3.
 */

var allChar=[];
var findArr=['[',']','='];

/** 如果分割后都是空.. */
function t(__text) {
    var __tmp = __text.split("\n")
    if(__tmp.length == 1)
        return [__text];
    if(__tmp.length == 2)
    {
        /** 两个都有值 */
        if(__tmp[0] != "" && __tmp[1] != "")
            return [__tmp[0],__tmp[1]];
        if(__tmp[0] != "")
            return [__tmp[0]];
        if(__tmp[1] != "")
            return [__tmp[1]];
        if(__tmp[0] == "" && __tmp[1] == "")
            return [""];
    }
    var __text="";
    for(var i = 0 ;i<__tmp.length-1;i++)
        __text=__text+__tmp[i]+"\n";
    /** \n 是一个特殊字符 不能用常用的 = 判断 */
    if(__text.lastIndexOf('\n') == __text.length-1)
        __text = __text.substring(0,__text.lastIndexOf('\n'));
    return [__text,__tmp[__tmp.length-1]];
}

/** Token */
function token(__text) {
    var __tmpChar = "" ;
    for(var i=0;i<__text.length;i++){
        if(findArr.indexOf(__text.charAt(i)) != -1  )
        {
            /** 这里上一行的内容和下一行的节点名 */
            var __tmp = t(__tmpChar)
            allChar.push(__tmp[0])
            if(__tmp.length>1) allChar.push(__tmp[1]);

            allChar.push(__text.charAt(i))
            __tmpChar = "";
        }
        else
            __tmpChar=__tmpChar+__text.charAt(i);

    }
    /** 如果最后一个字符不是空则获取 */
    if(__tmpChar != "")
        allChar.push(__tmpChar)
    /** 清理 */
    delete allChar[0];
    return allChar;
}

/**
 * 认定如下文法是有效的
 * [x] , x=x
 * 不符合的都将舍弃
 * */
function iniFormat(__text) {
    var __tmpArr = token(__text);
    var __arrIndex={};
    var __index="";
    for(var i=0 ;i<__tmpArr.length;i++){
        /** 根节点结束 */
        if(__tmpArr[i] == ']' && __tmpArr[i-2]=='['){
            __arrIndex[__tmpArr[i-1]]={};
            __index=__tmpArr[i-1];
        }
        if(__tmpArr[i-1] =="=" )
        {
            __arrIndex[__index][__tmpArr[i-2]]=__tmpArr[i]
        }

    }
    return __arrIndex;
}