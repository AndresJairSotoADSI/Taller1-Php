addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    let Form = document.querySelector("#form1");
    Form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        let config = {
            method: Form.method,
            body: JSON.stringify(data)
        };
        let peticion1 = await fetch(Form.action, config);
        let res1 = await peticion1.json();
        document.querySelector("#res1").innerHTML = res1.mensaje;

    })
    let limpiar1 = document.querySelector("#Limpi1");
    limpiar1.addEventListener("click", () => {
        document.querySelector("#form1").reset();
        document.querySelector("#res1").innerHTML = "";
    })


    let formulario2 = document.querySelector("#form2");
    formulario2.addEventListener("submit", async (e) => {
        e.preventDefault();
        let form = e.target;
        let data = Object.fromEntries(new FormData(form));

        let config = {
            method: formulario2.method,
            body: JSON.stringify(data)
        };
        let peticion2 = await fetch(formulario2.action, config);
        let respuesta2 = await peticion2.text();
        document.querySelector("#res2").innerHTML = respuesta2;

    })
    let limpiar2 = document.querySelector("#Limpi2");
    limpiar2.addEventListener("click", () => {
        document.querySelector("#form2").reset();
        document.querySelector("#res2").innerHTML = "";
    })
    let sumaA = 0,
        sumaB = 0,
        sumaC = 0,
        canA = 0,
        canB = 0,
        canC = 0;

    function sumaPro(genero, carrera, edad) {
        if (genero == "masculino") {
            if (carrera == "a") {
                sumaA = sumaA + edad;
                canA += 1;
            } else if (carrera == "b") {
                sumaB = sumaB + edad;
                canB += 1;
            } else {
                sumaC = sumaC + edad;
                canC += 1;
            }
        } else {
            null
        }
    }
    document.querySelector("#cantidad").removeAttribute("disabled");
    document.querySelector(".submit").removeAttribute("disabled");
    document.querySelector("#cantidad").addEventListener("keyup", (e) => {
        let genero = document.querySelector("#genero");
        let edad = document.querySelector("#edad");
        let carrera = document.querySelector("#carrera");
        if (e.target.value > 0) {
            genero.removeAttribute("disabled");
            edad.removeAttribute("disabled");
            carrera.removeAttribute("disabled");
        } else {
            genero.disabled = true;
            edad.disabled = true;
            carrera.disabled = true;
        }
    })
    let con = 1;
    let cont = 1;
    let lista = [];
    let formulario3 = document.querySelector("#form3");
    formulario3.addEventListener("submit", async (e) => {
        e.preventDefault();
        let cantidad = document.querySelector("#cantidad").value;
        document.querySelector("#cantidad").disabled = true;
        if (con < cantidad) {
            let form = e.target;
            let data = Object.fromEntries(new FormData(form));
            sumaPro(data["genero"], data["carrera"], parseInt(data["edad"]));
            document.querySelector("#genero").selectedIndex = 0;
            document.querySelector("#edad").value = "";
            document.querySelector("#carrera").selectedIndex = 0;
            con += 1;
            let plantillas = `
            <tr>
                <td>${cont}</td>
                <td>${data["genero"]}</td>
                <td>${data["edad"]}</td>
                <td>${data["carrera"]}</td>
            </tr>`;
            document.querySelector("#dataTable_carreras").insertAdjacentHTML("beforeend", plantillas);
            cont++;
        } else {
            let form = e.target;
            let data3 = Object.fromEntries(new FormData(form));
            sumaPro(data3["genero"], data3["carrera"], parseInt(data3["edad"]));
            document.querySelector("#res3").innerHTML = "";
            lista.push(sumaA);
            lista.push(canA);
            lista.push(sumaB);
            lista.push(canB);
            lista.push(sumaC);
            lista.push(canC);

            let plantillas = `
            <tr>
                <td>${cont}</td>
                <td>${data3["genero"]}</td>
                <td>${data3["edad"]}</td>
                <td>${data3["carrera"]}</td>
            </tr>`;
            document.querySelector("#dataTable_carreras").insertAdjacentHTML("beforeend", plantillas);
            cont++;

            let config = {
                method: form.method,
                body: JSON.stringify(lista)
            };
            let peticion3 = await fetch(form.action, config);
            let respuesta3 = await peticion3.text();
            document.querySelector(".Limpiar").removeAttribute("disabled");
            document.querySelector(".submit").disabled = true;
            document.querySelector("#res").insertAdjacentHTML("beforeend", respuesta3);
            document.querySelector("#genero").selectedIndex = 0;
            document.querySelector("#edad").value = "";
            document.querySelector("#carrera").selectedIndex = 0;
            genero.disabled = true;
            edad.disabled = true;
            carrera.disabled = true;
        }
    })

    let limpiar3 = document.querySelector("#Limpiar3");
    limpiar3.addEventListener("click", () => {
        document.querySelector("#form3").reset();
        document.querySelector("#cantidad").removeAttribute("disabled");
        document.querySelector(".submit").removeAttribute("disabled");
        document.querySelector(".Limpiar").disabled = true;
        document.querySelector("#dataTable_carreras").innerHTML = "";
        cont = 1;
        document.querySelector("#res3").innerHTML = "";
    })

    /*####################Ejercicio4###############*/
    let formulario4 = document.querySelector("#form4");
    formulario4.addEventListener("submit", async (e) => {
        e.preventDefault();
        let meses = document.querySelector("#meses4").value;
        let dato = new Date(meses);
        let year, mes, dia;
        var pago = 10;
        if (!!dato.valueOf()) {
            year = dato.getFullYear();
            mes = dato.getMonth() + 1;
            dia = dato.getDate() + 1;
        }
        let cont = 1;
        let nombreMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        for (let i = 0; i < 20; i++) {
            let plantillas = `
            <tr>
                <td>${cont}</td>
                <td>${dia + "/"} ${nombreMes[new Date(year, mes - 1, dia).getMonth()] + "/"} ${(new Date(year, mes - 1, dia).getMonth() == 0) ? ++year : year}</td>
                <td>${pago}</td>
            </tr>`;
            document.querySelector("#dataTablepagos").insertAdjacentHTML("beforeend", plantillas);
            cont++;
            pago = pago * 2;
            mes++;
            document.querySelector("#res4").innerHTML = `${pago}`;
        }

    })
    let limpiar4 = document.querySelector("#Limpi4");
    limpiar4.addEventListener("click", () => {
        document.querySelector("#form4").reset();
        document.querySelector("#dataTablepagos").innerHTML = "";
        document.querySelector("#res4").innerHTML = "";
    })
    /*#################Ejercicio 5 ###################*/
    let ventaMen = 0,
        ventaMed = 0,
        ventaSup = 0,
        canMen = 0,
        canMed = 0,
        canSup = 0,
        ventaTotal = 0;

    function sumaVentas(precio) {
        precio <= 500 ?
            (ventaMen += precio, canMen++) :
            precio <= 1000 && precio > 500 ?
            (ventaMed += precio, canMed++) :
            (ventaSup += precio, canSup++);
        ventaTotal = ventaMen + ventaMed + ventaSup;
    }
    let formulario5 = document.querySelector("#form5");
    formulario5.addEventListener("submit", async (e) => {
        e.preventDefault();
        let cantidad = document.querySelector("#cantidad").value;
        let precio = parseInt(document.querySelector("#precio").value);
        if (con < cantidad) {
            document.querySelector("#precio").value = "";
            con += 1;
            sumaVentas(precio);

        } else {
            sumaVentas(precio);
            let plantillas = `
                <tr>
                    <td>${"Superiores a 1000"}</td>
                    <td>${canSup}</td>
                    <td>${ventaSup}</td>
                </tr>
                <tr>
                    <td>${"superiores a 500 y menores a 1000"}</td>
                    <td>${canMed}</td>
                    <td>${ventaMed}</td>
                </tr>
                <tr>
                    <td>${"menores a 500"}</td>
                    <td>${canMen}</td>
                    <td>${ventaMen}</td>
                </tr>
                <tr>
                    <td colspan="2">${"venta total"}</td>
                    <td>${ventaTotal}</td>
                </tr>`;
            document.querySelector("#Table_tikitaki").insertAdjacentHTML("beforeend", plantillas);
            con = 1;
        }
    })
    let limpiar5 = document.querySelector("#Limpi5");
    limpiar5.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector("#form5").reset();
        document.querySelector("#Table_tikitaki").innerHTML = "";
    })
    /*#################Ejercicio 6 ###################*/
    function masa(presion, volumen) {
        return presion * volumen;
    }
    document.querySelector("#canti").removeAttribute("disabled");
    document.querySelector("#canti").addEventListener("keyup", (e) => {
        let presion = document.querySelector("#presion");
        let volumen = document.querySelector("#volumen");
        if (e.target.value > 0) {
            presion.removeAttribute("disabled");
            volumen.removeAttribute("disabled");
        } else {
            presion.disabled = true;
            volumen.disabled = true;
        }
    })
    let conu = 1,
        listay = [];
    let formulario6 = document.querySelector("#form6");
    formulario6.addEventListener("submit", async (e) => {
        e.preventDefault();
        let cantidad = document.querySelector("#cantidad").value;
        let presion = parseInt(document.querySelector("#presion").value);
        let volumen = parseInt(document.querySelector("#volumen").value);
        document.querySelector("#cantidad").disabled = true;
        if (conu < cantidad) {
            document.querySelector("#presion").value = "";
            document.querySelector("#volumen").value = "";
            con += 1;
            listay.push(masa(presion, volumen));
        } else {
            let form = e.target;
            listay.push(masa(presion, volumen));
            document.querySelector("#presion").disabled = true;
            document.querySelector("#volumen").disabled = true;
            let config = {
                method: form.method,
                body: JSON.stringify(listay)
            };

            let peticion6 = await fetch(form.action, config);
            let respuesta6 = await peticion6.text();
            document.querySelector("#res6").insertAdjacentHTML("beforeend", respuesta6)
        }
    })
    let limpiar6 = document.querySelector("#Limpi6");
    limpiar6.addEventListener("click", () => {
        document.querySelector("#form6").reset();
        document.querySelector("#res6").innerHTML = "";
    })
})