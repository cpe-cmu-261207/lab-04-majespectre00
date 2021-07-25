let tinput = ''
const tlist = document.querySelector("#tlist")
const updateinput = ev => {
    tinput = ev.target.value
}

const inputbox = document.querySelector("#inputbox")
 inputbox.addEventListener('keyup',ev=>{
     if(ev.keyCode === 13){
         addbtnclick()
     }
 })
let taskarr = []
let donearr = []
taskarr = JSON.parse(localStorage.getItem('usertask'))
donearr = JSON.parse(localStorage.getItem('donetask'))
show()
function show() {
    //localstorge thing
    if(taskarr == null){
        taskarr = []
    }
    if(donearr == null){
        donearr = []
    }


    localStorage.setItem('usertask',JSON.stringify(taskarr))
    tlist.innerHTML = ''
    for (let i = taskarr.length-1; i>= 0; i--) {
        //div
        const task = document.createElement('div')
        task.addEventListener('mouseenter',()=>{
            taskbtn.style.visibility = 'visible'
        })
        task.addEventListener('mouseleave',()=>{
            taskbtn.style.visibility = 'hidden'
        })
        task.classList = "border-b-2 py-2 justify-between flex"
        //text
        const tasktext = document.createElement('div')
        tasktext.classList="pl-5"
        const text = document.createElement('p')
        text.classList = "mt-1 font-sans text-green-600"
        text.innerHTML = taskarr[i]
        tasktext.append(text)

        const taskbtn = document.createElement('div')
        taskbtn.style.visibility ='hidden'
        //donebtn
        const donebtn = document.createElement('button')
        donebtn.innerHTML = "Done"
        donebtn.classList ="bg-white hover:bg-gray-100 font-semibold py-1 px-2 shadow border  rounded mr-2 text-green-700"
        donebtn.addEventListener('click',()=>{
            bdone(i)
        })
        //delbtn
        const delbtn = document.createElement('button')
        delbtn.innerHTML = "Delete"
        delbtn.classList ="bg-white hover:bg-gray-100 font-semibold py-1 px-2 shadow border rounded text-green-700"
        delbtn.addEventListener('click',()=>{
            bdel(i)
        })
        //append session
        taskbtn.append(donebtn)
        taskbtn.append(delbtn)
        task.append(tasktext)
        task.append(taskbtn)
        tlist.append(task)
    }
    for(let i = donearr.length-1;i>=0;i--){
        localStorage.setItem('donetask',JSON.stringify(donearr))
        const task = document.createElement('div')
        task.classList = "border-b-2 py-2 justify-between flex"
        const tasktext = document.createElement('div')
        tasktext.classList="pl-5"
        //text
        const text = document.createElement('p')
        text.classList = "mt-1 line-through text-gray-400"
        text.innerHTML = donearr[i]
        tasktext.append(text)
        //append session
        task.append(tasktext)
        tlist.append(task)
    }
}
function bdone(i){
    donearr.push(taskarr[i])
    taskarr.splice(i,1)
    show()
}
function bdel(i){
    taskarr.splice(i,1)
    show()
}


const addbtnclick = () => {
    if(tinput == ""){
        alert("Please input task")
    }else{
    let inputtask = tinput
    taskarr.push(tinput)
    document.getElementById('inputbox').value = ''
    tinput = ''
    show()
    }
}

const clearbtnclick = ()=>{
    taskarr  =[]
    donearr= []
    localStorage.setItem('usertask',JSON.stringify(taskarr))
    localStorage.setItem('donetask',JSON.stringify(donearr))
    document.getElementById('inputbox').value = ''
    location.reload()
    show()
    alert("All Tasks have been deleted")
}