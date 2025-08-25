document.getElementById("registroForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Capturar todos los datos del formulario
  const datos = {
    fecha: document.getElementById("fecha").value,
    grupo: document.getElementById("grupo").value,
    codigo: document.getElementById("codigo").value,
    alim: document.getElementById("alim").value,
    celda: document.getElementById("Celda").value,
    potencia: document.getElementById("potencia").value,
    cableNormalizado: document.getElementById("cableNormalizado").value,
    cableSustraido: document.getElementById("cableSustraido").value,
    seccionCable: document.getElementById("seccionCable").value,
    tipoCable: document.getElementById("tipoCable").value,
    ternasExistentes: document.getElementById("ternasExistentes").value,
    ternasFaltantes: document.getElementById("ternasFaltantes").value,
    decoloracion: document.getElementById("decoloracion").value,
    carga1: document.getElementById("carga1").value,
    carga2: document.getElementById("carga2").value,
    carga3: document.getElementById("carga3").value,
    todosCables: document.getElementById("todosCables").value,
    tapon: document.getElementById("tapon").value,
    filtracion: document.getElementById("filtracion").value,
    dondeFiltracion: document.getElementById("dondeFiltracion").value,
    sensacion: document.getElementById("sensacion").value,
    equipoBT: document.getElementById("equipoBT").value,
    estadoBT: document.getElementById("estadoBT").value,
    sistemaBarra: document.getElementById("sistemaBarra").value,
    hallazgos: document.getElementById("hallazgos").value,
    imagenes: [] // Aquí se almacenarán las imágenes en Base64
  };

  // Procesar archivos de imagen
  const archivos = document.getElementById("imagenes").files;

  // Usamos un bucle for-of para trabajar con promesas
  for (const archivo of archivos) {
    if (datos.imagenes.length >= 10) break; // Limitar a 10 imágenes

    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Obtener solo la cadena Base64
      reader.onerror = (error) => reject(error);
    });

    datos.imagenes.push({
      nombre: archivo.name,
      contenidoBase64: base64String
    });
  }

  try {
    const response = await fetch("https://prod-29.brazilsouth.logic.azure.com:443/workflows/55c50e4786ac4b6d8e7c847e073406c8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0AJgO27Tp2dSUdwcv5ties3GrFuGZ_2bbMP0nGYPKbk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      alert("✅ Datos enviados correctamente");
      document.getElementById("registroForm").reset();
      document.getElementById("fecha").value = new Date().toLocaleDateString("es-PE");
    } else {
      alert("❌ Error al enviar datos");
    }
  } catch (error) {
    alert("⚠️ Hubo un problema con la conexión");
    console.error(error);
  }
});




