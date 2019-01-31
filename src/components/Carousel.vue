<template>
    <div class="carousel">
        <transition-group name="slide" class="container">
             <div class="carousel__item" 
                v-for="carousel in carousels" :key="carousel.id"
                :class="carousel.class">
                    {{carousel.name}}
                    <button class="btn">read more</button>
             </div>
        </transition-group>
        <span class="carousel__control carousel__control-next" @click="slide(1)"> 
            <span class="bubble"></span>
        </span>
        <span class="carousel__control carousel__control-prev" @click="slide(-1)">
            <span class="bubble"></span>
        </span>
        <div class="progress-bar">
            <div class="progress" :style="{width: currentIndex*(100/3) + '%'}"></div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            carousels: [
                {
                    name: 'item1',
                    class: [],
                    id: 1
                },
                {
                    name: 'item2',
                    class: [],
                    id: 2
                },
                {
                    name: 'item3',
                    class: [],
                    id: 3
                }
            ],
            currentIndex: 1,
            position: 1,
            isPlaying: false
        }
    },
    methods: {
        disableClass() {
            this.carousels.forEach((carousel)=> {
                if (carousel.class.includes('active')) {
                    let i = carousel.class.indexOf('active')
                    carousel.class = carousel.class.slice(0,i)
                }
            })
        },
        slide(index) {
            this.currentIndex += index 
            if (this.currentIndex > this.carousels.length) this.currentIndex = 1
            if (this.currentIndex < 1) this.currentIndex = this.carousels.length
            this.disableClass()
            this.carousels[this.currentIndex-1].class.push('active')
            if (this.currentIndex-1 !== 1 ) {
                let [removedCarousel] = this.carousels.splice(this.currentIndex-1, 1)
                this.carousels.splice(1, 0, removedCarousel)
            }
            
        },
        automaticSlide() {
            if (this.position > this.carousels.length) this.position = 1
            if (!this.isPlaying) {
                this.disableClass()
                this.carousels[this.position-1].class.push('active')
                this.position++
                setTimeout(automaticSlide, 2000);
            }
        }
    },
    mounted() {
    }
}
</script>



<style scoped>

.carousel {
    position: relative;
    background-color: gray;
}
.container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 80vh;
    padding: 4rem;
}
.carousel__item {
    width: 100%;
    padding: 4rem;
    margin: 0 2rem;
    opacity: 0.2;
    transform: scale(0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1; 
    transition: all 0.5s;
}
.carousel__control {
    display: inline-block;
    padding: 4rem;
    font-size: 2rem;
    color: white;
    position: absolute;
    cursor: pointer;
    z-index: 10;
    opacity: 0.7;
}
.carousel__control-next {
    right: 4rem;
    top: 40%;
}
.carousel__control-prev {
    left: 4rem;
    top: 40%;
}
.bubble {
    display: inline-block;
    width: 4rem;
    height: 1px;
    background-color: white;
    transition: all 0.2s;
}
.carousel__control:hover .bubble::after{
    transform: translateX(2rem) scale(1.01)
}
.bubble::after {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
    margin: 1px;
    transition: all 0.2s;
}
.active {
    opacity: 1;
    z-index: 5;
    transform: scale(1)
}
.btn {
    padding: 2rem 4rem;
    background-color: transparent;
    border: 1px solid white;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
    transform: translateY(6rem);
    opacity: 0;
    transition: all 0.5s;
    margin: 10rem 0;
    position: relative;
    color: white;
}

.btn::before {
    content: "";
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0;
    background-color: white;
    transition: all 0.5s;
    z-index: -1;
}
.btn:hover {
    color: black;
}
.btn:hover:before {
    top: 0;
    height: 100%;
}
.btn:active,.btn:focus {
    outline: none;
}

.active > .btn {
    transform: translateY(0);
    opacity: 1;
}
.progress-bar {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 5rem;
    background-color: white;
}
.progress {
    width: 0;
    height: 0.2rem;
    background-color: orangered;
    transition: all 0.5s;
}

.slide-move {
    transition: all 1s;
}

    
</style>