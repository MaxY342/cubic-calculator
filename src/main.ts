let form = document.getElementById("cubic-form") as HTMLFormElement;
let aInput = document.getElementById("a") as HTMLInputElement;
let bInput = document.getElementById("b") as HTMLInputElement;
let cInput = document.getElementById("c") as HTMLInputElement;
let dInput = document.getElementById("d") as HTMLInputElement;
let firstRoot = document.getElementById("root1-x") as HTMLDivElement;
let secondRoot = document.getElementById("root2-x") as HTMLDivElement;
let thirdRoot = document.getElementById("root3-x") as HTMLDivElement;
let pValue = document.getElementById("p-value") as HTMLDivElement;
let qValue = document.getElementById("q-value") as HTMLDivElement;
let discriminantValue = document.getElementById("discriminant-value") as HTMLDivElement;
let equation = document.getElementById("equation") as HTMLHeadingElement;
const canvas = document.getElementById("graph") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const a:number = Number(aInput.value);
    const b:number = Number(bInput.value);
    const c:number = Number(cInput.value);
    const d:number = Number(dInput.value);
    const p:number = (3 * a * c - b * b) / (3 * a * a);
    const q:number = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const discriminant = (q * q) / 4 + (p * p * p) / 27;
    let root1: number | undefined;
    let root2: number | undefined;
    let root3: number | undefined;
    pValue.textContent = String(p.toFixed(5));
    qValue.textContent = String(q.toFixed(5));
    discriminantValue.textContent = String(discriminant.toFixed(5));
    equation.textContent = `${String(a)}x\u00b3 + ${String(b)}x\u00b2 + ${String(c)}x + ${String(d)}`
    if (discriminant < 0) {
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-(p * p * p / 27))));
        root1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
        root2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI / 3)) - b / (3 * a);
        root3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI / 3)) - b / (3 * a);
        firstRoot.textContent = String(root1.toFixed(2));
        secondRoot.textContent = String(root2.toFixed(2));
        thirdRoot.textContent = String(root3.toFixed(2));
    } else if (discriminant > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        root1 = u + v - b / (3 * a);
        firstRoot.textContent = String(root1.toFixed(2));
        secondRoot.textContent = "No real root";
        thirdRoot.textContent = "No real root";
    } else {
        if (p === 0 && q === 0) {
            root1 = root2 = root3 = -b / (3 * a);
            firstRoot.textContent = String(root1.toFixed(2));
            secondRoot.textContent = String(root2.toFixed(2));
            thirdRoot.textContent = String(root3.toFixed(2));
        } else {
            const u = Math.cbrt(-q / 2);
            root1 = 2 * u - b / (3 * a);
            root2 = -u - b / (3 * a);
            firstRoot.textContent = String(root1.toFixed(2));
            secondRoot.textContent = String(root2.toFixed(2));
            thirdRoot.textContent = "No real root";
        }
    }
    drawGraph(a, b, c, d);
    if (root1 !== undefined) {
        drawPoint(root1, 0);
    }
    if (root2 !== undefined) {
        drawPoint(root2, 0);
    }
    if (root3 !== undefined) {
        drawPoint(root3, 0);   
    }
});

for (let i = 0; i <= 26; i++) {
    ctx.beginPath();
    if (i === 13) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    } else {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    }
    ctx.moveTo(i * 20, 0);
    ctx.lineTo(i * 20, 520);
    ctx.moveTo(0, i * 20);
    ctx.lineTo(520, i * 20);
    ctx.stroke();
}

function drawGraph(a: number, b: number, c: number, d: number) {
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    const unitGap: number = 20;
    const halfWidth: number = canvas.width / 2;
    const halfHeight: number = canvas.height / 2;
    ctx.beginPath();
    for (let x = -13; x <= 13; x += 0.1) {
        const y = a * (x * x * x) + b * (x * x) + c * x + d;
        console.log(x, y);
        ctx.lineTo(x*unitGap + halfWidth, halfHeight - y*unitGap);
    }
    ctx.stroke();
}

function drawPoint(x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x * 20 + 260, 260 - y * 20, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    ctx.fill();
}