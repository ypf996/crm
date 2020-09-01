$(function () {

    let lx = "my";
    let limit = 10;
    let page = 1;
    let totalPage = 1;
    let toatl = 0;
    let params = window.location.href.queryURLParams();
    params.lx ? lx=params.lx : null;

    //获取客户列表
    showCustmoerList();
    async function showCustmoerList() {
        let result = await axios.get("/customer/list",{
            params:{
                lx,
                type:$(".selectBox").val(),
                search:$(".searchInp").val().trim(),
                limit,
                page,
            }
        })
        // console.log(result)
        if(result.code != 0) return alert("网络不好,请稍后再试")

        totalPage = parseInt(result.totalPage)
        total = parseInt(result.total)

        result = result.data;
        let str =  ``;
        result.forEach(item=>{
            let {
                id,
                name,
                sex,
                email,
                phone,
                QQ,
                weixin,
                type,
                address,
                userName
            } = item;
            str += `<tr>
            <td class="w8">${name}</td>
            <td class="w5">${sex==0?'男':'女'}</td>
            <td class="w10">${email}</td>
            <td class="w10">${phone}</td>
            <td class="w10">${weixin}</td>
            <td class="w10">${QQ}</td>
            <td class="w5">${type}</td>
            <td class="w8">${userName}</td>
            <td class="w20">${address}</td>
            <td class="w14" customerId="${id}">
                <a href="javascript:;">编辑</a>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">回访记录</a>
            </td>           
            `
        })
        $("tbody").html(str)
        if(totalPage>1){
            str = ``;
            page > 1 ? str += `<a href="javascript:;">上一页</a>` : null;
            str += `<ul class="pageNum">`;
            for (let i = 1; i <= totalPage; i++){
                str += `<li class="${i==page?'active':''}">${i}</li>`
            }
            str +=`</ul>`;
            page < totalPage ? str += `<a href="javascript:;">下一页</a>` : null;
            $(".pageBox").html(str);
        }
    }


    //
    handle();
    function handle(){
        $(".selectBox").change(showCustmoerList);
        $(".searchInp").keydown(function (ev){
            if(ev.keyCode === 13){
                showCustmoerList
            }
        })
        $(".pageBox").click(e=>{
            let target = e.target,
            tag = target.tagName,
            text = target.innerHTML,
            temp = page;

            if(tag == "A"){
                if(text === "上一页"){ temp--; }
                if(text === "下一页"){ temp++; }
            }
            if(tag == "LI"){
                temp = parseInt(text)
            }
            temp !== page ? (page=temp,showCustmoerList()) : null;
        })

    }
})