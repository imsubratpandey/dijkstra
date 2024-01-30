import React, { useRef, useEffect } from 'react';
import "../css/ParticleNetworkAnimation.css";

interface Props {
    mouseCaptureRef: any
}

export default function ParticleNetworkAnimation({ mouseCaptureRef }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const interactionParticleRef = useRef<Particle | null>(null);
    const mouseIsDownRef = useRef<boolean>(false);
    const touchIsMovingRef = useRef<boolean>(false);
    const spawnQuantityRef = useRef<number>(3);
    const options = {
        velocity: 1,
        density: 15000,
        netLineDistance: 200,
        netLineColor: '#929292',
        particleColors: ['#6D4E5C', '#aaa', '#0000FF']
    };
    const getLimitedRandom = (min: number, max: number, roundToInteger?: boolean) => {
        let number = Math.random() * (max - min) + min;
        if (roundToInteger) {
            number = Math.round(number);
        }
        return number;
    }
    const returnRandomArrayitem = <T extends {}>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)];
    }
    class Particle {
        network = particlesRef.current;
        canvas = canvasRef.current;
        ctx = canvasRef.current?.getContext('2d');
        particleColor = returnRandomArrayitem(options.particleColors);
        radius = getLimitedRandom(1.5, 2.5);
        opacity = 0;
        x: number;
        y: number;
        velocity = {
            x: (Math.random() - 0.5) * options.velocity,
            y: (Math.random() - 0.5) * options.velocity
        };
        constructor(x?: number, y?: number) {
            this.x = x || Math.random() * this.canvas?.width!;
            this.y = y || Math.random() * this.canvas?.height!;
        }
        update() {
            if (this.opacity < 1) {
                this.opacity += 0.01;
            }
            else {
                this.opacity = 1;
            }
            if (this.x > this.canvas!.width + 100 || this.x < -100) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.y > this.canvas!.height + 100 || this.y < -100) {
                this.velocity.y = -this.velocity.y;
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        draw() {
            if (!this.ctx)
                return;
            this.ctx.beginPath();
            this.ctx.fillStyle = this.particleColor;
            this.ctx.globalAlpha = this.opacity;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const welcomeContainer = mouseCaptureRef.current;
        const ctx = canvas?.getContext('2d');
        const options = {
            velocity: 1,
            density: 15000,
            netLineDistance: 200,
            netLineColor: '#929292',
            particleColors: ['#6D4E5C', '#aaa', '#FFC458']
        };
        const getLimitedRandom = (min: number, max: number, roundToInteger?: boolean) => {
            let number = Math.random() * (max - min) + min;
            if (roundToInteger) {
                number = Math.round(number);
            }
            return number;
        }
        const returnRandomArrayitem = <T extends {}>(array: T[]): T => {
            return array[Math.floor(Math.random() * array.length)];
        }
        class Particle {
            network = particlesRef.current;
            canvas = canvasRef.current;
            ctx = canvasRef.current?.getContext('2d');
            particleColor = returnRandomArrayitem(options.particleColors);
            radius = getLimitedRandom(1.5, 2.5);
            opacity = 0;
            x: number;
            y: number;
            velocity = {
                x: (Math.random() - 0.5) * options.velocity,
                y: (Math.random() - 0.5) * options.velocity
            };
            constructor(x?: number, y?: number) {
                this.x = x || Math.random() * this.canvas?.width!;
                this.y = y || Math.random() * this.canvas?.height!;
            }
            update() {
                if (this.opacity < 1) {
                    this.opacity += 0.01;
                }
                else {
                    this.opacity = 1;
                }
                if (this.x > this.canvas!.width + 100 || this.x < -100) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.y > this.canvas!.height + 100 || this.y < -100) {
                    this.velocity.y = -this.velocity.y;
                }
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
            draw() {
                if (!this.ctx)
                    return;
                this.ctx.beginPath();
                this.ctx.fillStyle = this.particleColor;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
        if (!canvas || !container || !ctx)
            return;
        let animationFrame: number;
        function sizeCanvas() {
            if (canvas && container) {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
        }
        function createParticles(isInitial: boolean) {
            particlesRef.current = [];
            if (canvas) {
                const quantity = canvas.width * canvas.height / options.density;
                if (isInitial) {
                    let counter = 0;
                    const createIntervalId = setInterval(() => {
                        if (counter < quantity - 1) {
                            particlesRef.current.push(new Particle());
                        } else {
                            clearInterval(createIntervalId);
                        }
                        counter++;
                    }, 250);
                } else {
                    for (let i = 0; i < quantity; i++) {
                        particlesRef.current.push(new Particle());
                    }
                }
            }
        }
        function createInteractionParticle() {
            interactionParticleRef.current = new Particle();
            interactionParticleRef.current.velocity = {
                x: 0,
                y: 0
            };
            particlesRef.current.push(interactionParticleRef.current);
        }
        function removeInteractionParticle() {
            if (interactionParticleRef.current) {
                const index = particlesRef.current.indexOf(interactionParticleRef.current);
                if (index > -1) {
                    interactionParticleRef.current = null;
                    particlesRef.current.splice(index, 1);
                }
            }
        }
        function update() {
            if (!canvas)
                return;
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
                for (let i = 0; i < particlesRef.current.length; i++) {
                    for (let j = particlesRef.current.length - 1; j > i; j--) {
                        let distance, p1 = particlesRef.current[i], p2 = particlesRef.current[j];
                        distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
                        if (distance > options.netLineDistance)
                            continue;
                        distance = Math.sqrt(
                            Math.pow(p1.x - p2.x, 2) +
                            Math.pow(p1.y - p2.y, 2)
                        );
                        if (distance > options.netLineDistance)
                            continue;
                        ctx.beginPath();
                        ctx.strokeStyle = options.netLineColor;
                        ctx.globalAlpha = (options.netLineDistance - distance) / options.netLineDistance * p1.opacity * p2.opacity;
                        ctx.lineWidth = 0.7;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
                for (let i = 0; i < particlesRef.current.length; i++) {
                    particlesRef.current[i].update();
                    particlesRef.current[i].draw();
                }
                if (options.velocity !== 0) {
                    animationFrame = requestAnimationFrame(update);
                }
            }
        }
        function bindUiActions() {
            function onMouseMove(e: MouseEvent) {
                if (!interactionParticleRef.current) {
                    createInteractionParticle();
                }
                if (interactionParticleRef.current) {
                    interactionParticleRef.current.x = e.offsetX;
                    interactionParticleRef.current.y = e.offsetY;
                }
            }
            function onTouchMove(e: TouchEvent) {
                e.preventDefault();
                touchIsMovingRef.current = true;
                if (!interactionParticleRef.current) {
                    createInteractionParticle();
                }
                if (interactionParticleRef.current) {
                    interactionParticleRef.current.x = e.changedTouches[0].clientX;
                    interactionParticleRef.current.y = e.changedTouches[0].clientY;
                }
            }
            function onMouseDown(e: MouseEvent) {
                mouseIsDownRef.current = true;
                let counter = 0;
                let quantity = spawnQuantityRef.current;
                const intervalId = setInterval(() => {
                    if (mouseIsDownRef.current) {
                        if (counter === 1) {
                            quantity = 1;
                        }
                        for (let i = 0; i < quantity; i++) {
                            if (interactionParticleRef.current) {
                                particlesRef.current.push(new Particle(interactionParticleRef.current.x, interactionParticleRef.current.y));
                            }
                        }
                    } else {
                        clearInterval(intervalId);
                    }
                    counter++;
                }, 50);
            }
            function onTouchStart(e: TouchEvent) {
                e.preventDefault();
                setTimeout(() => {
                    if (!touchIsMovingRef.current) {
                        for (let i = 0; i < spawnQuantityRef.current; i++) {
                            particlesRef.current.push(new Particle(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
                        }
                    }
                }, 200);
            }
            function onMouseUp(e: MouseEvent) {
                mouseIsDownRef.current = false;
            }
            function onMouseOut(e: MouseEvent) {
                removeInteractionParticle();
            }
            function onTouchEnd(e: TouchEvent) {
                e.preventDefault();
                touchIsMovingRef.current = false;
                removeInteractionParticle();
            }
            if (welcomeContainer) {
                welcomeContainer.addEventListener('mousemove', onMouseMove);
                welcomeContainer.addEventListener('touchmove', onTouchMove);
                welcomeContainer.addEventListener('mousedown', onMouseDown);
                welcomeContainer.addEventListener('touchstart', onTouchStart);
                welcomeContainer.addEventListener('mouseup', onMouseUp);
                welcomeContainer.addEventListener('mouseout', onMouseOut);
                welcomeContainer.addEventListener('touchend', onTouchEnd);
            }
        }
        sizeCanvas();
        createParticles(true);
        animationFrame = requestAnimationFrame(update);
        bindUiActions();
        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [mouseCaptureRef]);
    useEffect(() => {
        const options = {
            velocity: 1,
            density: 15000,
            netLineDistance: 200,
            netLineColor: '#929292',
            particleColors: ['#6D4E5C', '#aaa', '#FFC458']
        };
        const getLimitedRandom = (min: number, max: number, roundToInteger?: boolean) => {
            let number = Math.random() * (max - min) + min;
            if (roundToInteger) {
                number = Math.round(number);
            }
            return number;
        }
        const returnRandomArrayitem = <T extends {}>(array: T[]): T => {
            return array[Math.floor(Math.random() * array.length)];
        }
        class Particle {
            network = particlesRef.current;
            canvas = canvasRef.current;
            ctx = canvasRef.current?.getContext('2d');
            particleColor = returnRandomArrayitem(options.particleColors);
            radius = getLimitedRandom(1.5, 2.5);
            opacity = 0;
            x: number;
            y: number;
            velocity = {
                x: (Math.random() - 0.5) * options.velocity,
                y: (Math.random() - 0.5) * options.velocity
            };
            constructor(x?: number, y?: number) {
                this.x = x || Math.random() * this.canvas?.width!;
                this.y = y || Math.random() * this.canvas?.height!;
            }
            update() {
                if (this.opacity < 1) {
                    this.opacity += 0.01;
                }
                else {
                    this.opacity = 1;
                }
                if (this.x > this.canvas!.width + 100 || this.x < -100) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.y > this.canvas!.height + 100 || this.y < -100) {
                    this.velocity.y = -this.velocity.y;
                }
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
            draw() {
                if (!this.ctx)
                    return;
                this.ctx.beginPath();
                this.ctx.fillStyle = this.particleColor;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
        window.addEventListener("resize", () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx && canvas && container) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
                particlesRef.current = [];
                if (canvas) {
                    const quantity = canvas.width * canvas.height / options.density;
                    for (let i = 0; i < quantity; i++) {
                        particlesRef.current.push(new Particle());
                    }
                }
            }
        }, false);
    }, []);
    return (
        <>
            <div ref={containerRef} className="particle-network-animation">
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    )
}
