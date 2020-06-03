<template>
 <div v-click-outside>
   <input type="text" :value="formatDate" >
   <div  :class="$style.pannel" v-if="isVisible">
       <div :class="$style.panneNav">
           <span @click="prevYear">&lt;</span>
           <span @click='prevMonth'>&lt;&lt;</span>
           <span>{{time.year}}年</span>
           <span>{{time.month}}月</span>
           <span  @click='nextMont'>&gt;&gt;</span>
           <span @click='nextYear'>&gt;</span>
           
       </div>
       <div :class="$style.pannelContent">
         <div :class='$style.days'>
           <span 
             v-for="j in 7" :key='`_i`+j'
             :class="$style.cell"          
           >
             {{weekDays[j-1]}}
           </span>
           <!-- 直接列出一个 6 * 7 一个列表 -->
           <!-- 判断是不是当月 不是当月就变灰色 -->
           <div v-for='i in 6' :key="'_a'+i">
             <span 
              :class="[$style.cell,
                {[$style.notCuurentMonth]:!isCurrentMoth(visibeDays[(i-1)*7+(j-1)],i)},
                {[$style.today]:isToday(visibeDays[(i-1)*7+(j-1)])},
                {[$style.today]:isSelect(visibeDays[(i-1)*7+(j-1)])}
                ]"
              v-for="j in 7" 
              :key="'_b'+j"
              @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
              >
               {{visibeDays[(i-1)*7+(j-1)].getDate()}}
             </span>
           </div>
         </div>
       </div>
   </div>
 </div>
</template>

<script>
import {getYearMonthDay,getDate} from './utils'
export default {
 directives:{
   clickOutside:{//指令的生命周期
     bind(el,bindings,vnode){
       // 把事件绑定给document上 看一下点击的是否是当前这个元素
       let handler = (e)=>{
         if(el.contains(e.target)){
           // 判断一下是否当前面板已经显示出来了
           if(!vnode.context.isVisible){
             vnode.context.focus()
           }
         }else{
           if(vnode.context.isVisible){
             vnode.context.blur()
           }
         }
       }
       el.handler = handler
       document.addEventListener('click',handler)
     },
     unbind(){
       document.removeEventListener('click')
     }
   }
 },
 data(){
   let {year,month} = getYearMonthDay(this.value)
   return{
     weekDays:['日','一','二','三','四','五','六',],
     time:{year,month:month+1},
     isVisible:true,//这个变量是用来控制这个面板是否可见
   }
 },
 props:{
   value:{
     type:Date,
     default:()=>new Date()
   }
 },
 methods:{
   focus(){
     this.isVisible = true
   },
   blur(){
     this.isVisible = false
   },
   // 判断月份是否相对 月份相等就说明是本月的 
   isCurrentMoth(date,i){
     //  获取当前的月份
     let {year,month} = getYearMonthDay(this.value);
     //  获取传入时候的月份
     let {year:y,month:m} = getYearMonthDay(date)
     return year === y && month === m 
   },
   // 判断是否是今天 
   isToday(date){
     let {year,month,day} = getYearMonthDay(new Date());
     let {year:y,month:m,day:d} = getYearMonthDay(date);
     return year === y && month === m && day === d
   },
   chooseDate(date){
     console.log('====',date)
     let {year,month,day} = getYearMonthDay(date);
     month = month +1 
     this.time = {year,month}
     date = getDate(year,month-1,day)
     this.$emit('input',date)
     this.blur()
   },
   isSelect(date){
    //  let {year,month,day} = getYearMonthDay(getDate(this.time.year,this.time.month,1));
    //  let {year:y,month:m,day:d} = getYearMonthDay(date);
    //  return year === y && month === m && day === d
   },
   prevMonth(){
     let d = getDate(this.time.year,this.time.month,1)
     d.setMonth(d.getMonth()-1)
     this.time = getYearMonthDay(d)
   },
    prevYear(){
     let d = getDate(this.time.year,this.time.month,1)
     d.setYear(d.getFullYear()-1)
     this.time = getYearMonthDay(d)
   },
   nextMont(){
     let d = getDate(this.time.year,this.time.month,1)
     d.setMonth(d.getMonth()+1)
     this.time = getYearMonthDay(d)
   },
   nextYear(){
     let d = getDate(this.time.year,this.time.month,1)
     d.setYear(d.getFullYear()+1)
     this.time = getYearMonthDay(d)
   }
 },
 computed: {
   visibeDays(){
     // 先获取当前是周几
     let {year,month,day} = getYearMonthDay(getDate(this.time.year,this.time.month-1,1))
     // 获取当前月份的第一天 是周几, (例如周二 就往补2天)
     let currentFirstDay = getDate(year,month,1)
     // 生成一个 当前 2019 5 18
     // 获取当前是周几  把天数往前移动 几天
     let week = currentFirstDay.getDay();
     // 当前开始的天数, 日期格式 和 和 数字相减得到一个毫秒戳
     let startMoveDay = currentFirstDay - week * 60 * 60 * 1000 * 24
     let rs = new Date(startMoveDay)
     // 循环42天
     let arr = []
     for(let i=0;i<42;i++){
       // 依次循环出42天
       arr.push(new Date(startMoveDay+i * 60 * 60 * 1000 * 24))
     }
     return arr
   },
   formatDate(){
     let {year,month,day} = getYearMonthDay(this.value)
     return `${year}-${month+1}-${day}`
   }
 },
}
</script>
<style lang='scss' module>
.pannel{
  position: absolute;
  background: #fff;
  box-shadow: 2px 2px 2px pink, -2px -2px 2px pink;
 .panneNav{
     height: 30px;
     display: flex;
     justify-content: space-around;
     span {
       cursor: pointer;
       user-select: none;
     }
 }
 .pannelContent{
     box-sizing: border-box;
   .cell{
     display:  inline-block;
     justify-content: center;
     align-items: center;
     width:50px;
     height: 50px;
     font-weight: bold;
     text-align: center;
     box-sizing: border-box;
     line-height: 50px;
   }
   .cell:hover{
       background: pink;
       box-sizing: border-box;
       line-height: 50px;
     }
   .notCuurentMonth{
     color:gray
   }
   .today{
     color: #fff;
     background: red;
     border-radius: 4px;
   }
   .select{
     color: #fff;
     background: red;
     border-radius: 4px;
   }
 }
 .pannel-footer{
   height: 30px;
   text-align: center
 }
 
}
</style>