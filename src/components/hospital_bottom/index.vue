<template>
    <div class="bottom">
        <div class="cont">
            <div class="left">京ICP备 13018369号 电话挂号010-56253825</div>
            <div class="right">
                <span>联系我们</span>
                <span>合作伙伴</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.bottom {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    margin-top: 30px;
    background: #f0f2f5;

    .cont {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        .right {
            span {
                margin: 0px 5px;
            }
        }
    }
}
</style>