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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const a:number = Number(aInput.value);
    const b:number = Number(bInput.value);
    const c:number = Number(cInput.value);
    const d:number = Number(dInput.value);
    const p:number = (3 * a * c - b * b) / (3 * a * a);
    const q:number = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const discriminant = (q * q) / 4 + (p * p * p) / 27;
    pValue.textContent = String(p);
    qValue.textContent = String(q);
    discriminantValue.textContent = String(discriminant);
    if (discriminant < 0) {
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-p * p * p / 27)));
        let root1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
        let root2 = 2 * Math.cbrt(-p / 3) * Math.cos(theta + (2 * Math.PI / 3)) - b / (3 * a);
        let root3 = 2 * Math.cbrt(-p / 3) * Math.cos(theta + (4 * Math.PI / 3)) - b / (3 * a);
        firstRoot.textContent = String(root1);
        secondRoot.textContent = String(root2);
        thirdRoot.textContent = String(root3);
    } else if (discriminant > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        let root = u + v - b / (3 * a);
        firstRoot.textContent = String(root);
        secondRoot.textContent = "No real root";
        thirdRoot.textContent = "No real root";
    } else {
        if (p === 0 && q === 0) {
            let root = -b / (3 * a);
            firstRoot.textContent = String(root);
            secondRoot.textContent = String(root);
            thirdRoot.textContent = String(root);
        } else {
            const u = Math.cbrt(-q / 2);
            let root1 = 2 * u - b / (3 * a);
            let root2 = -u - b / (3 * a);
            firstRoot.textContent = String(root1);
            secondRoot.textContent = String(root2);
            thirdRoot.textContent = "No real root";
        }
    }
});