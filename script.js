document.getElementById("miFormulario").addEventListener("submit", async function(e){
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    comentario: document.getElementById("comentario").value
  };

  try {
    const response = await fetch("https://prod-29.brazilsouth.logic.azure.com:443/workflows/55c50e4786ac4b6d8e7c847e073406c8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0AJgO27Tp2dSUdwcv5ties3GrFuGZ_2bbMP0nGYPKbk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    if(response.ok){
      alert("✅ Datos enviados correctamente");
      document.getElementById("miFormulario").reset(); // limpia el formulario
    } else {
      alert("❌ Error al enviar datos");
    }
  } catch (error) {
    alert("⚠️ Hubo un problema con la conexión");
    console.error(error);
  }
});

