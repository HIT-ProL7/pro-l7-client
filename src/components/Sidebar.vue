<script setup lang="js"></script>

<template>
    <div class="side-bar">
        <div class="logo">
        <img   src="../assets/logo.png" alt="logo">
    </div> <br>
        <div class="avatar">
           <img  src="../assets/avatar.png" alt=""> 
        </div>
        <div class="icon-cha">
        <div class="icon">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"/></svg>
            <p>Trang chủ</p>
        </div>
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21M6 14h12v-2H6zm0 3h12v-1.5H6z"/></svg>
            <p>Diễn đàn</p>
        </div>
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13 13a4 4 0 0 1 4 4v1.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2 18.5V17a4 4 0 0 1 4-4zm6 0a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5H19v-2a5 5 0 0 0-2-4zM9.5 3a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9M18 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6"/></g></svg>
            <p>Bạn bè</p>
        </div></div>
        <div class="chuong">
            <svg style="color: #FFB218;" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 36 36"><path fill="currentColor" d="m32.85 28.13l-.34-.3A14.4 14.4 0 0 1 30 24.9a12.6 12.6 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.6 12.6 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="currentColor" d="M15.32 32a2.65 2.65 0 0 0 5.25 0Z" class="clr-i-solid clr-i-solid-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
   
    .side-bar{
        width: 90px;
        height: 100vh;
        background-color: white;
        font-size: 13px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo{
            border-bottom: 1px solid  #777575;
            width: 90px;
            height: 90px;
            padding: 15px;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        .avatar{
            width: 72px;
            height: 72px;
            margin-bottom: 16px;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
                
            }
        }    
        .icon-cha{
        width: 80px;
        height: 296px;
        padding: 4px 4px 56px 4px;
        }
        .icon:hover{
            background-color: #F06C25;
            color: white; 
            cursor: pointer;
            // transition: 0.5s;
        }
        .icon{
           padding: 16px 0;
            padding-left: 4px;
            padding-right: 4px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 8px;
            }
        .chuong{
            border-radius: 100%;
            background-color: #E3E3E3;
            width: 56px;
            height: 56px;
            padding: 10px;
            bottom: 25px;
            position: absolute;
        }    
    }       
</style>        

    
   

