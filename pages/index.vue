<template>
  <div class="viko-style grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
      <section>
        <DigitalClock />

        <span class="block text-6xl font-bold mb-1">Pasirinkite dominančią temą</span>
        <br>

        <a href="/darbuotojai" target="_blank">
          <Button label="Kabinetų paieška" class="mr-3 p-button-raised p-button-rounded p-button-lg" />
        </a>
        <a href="/aktualu" target="_blank">

          <Button label="Aktuali informacija" class="p-button-raised p-button-rounded p-button-lg" />
        </a>
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img src="https://i.ibb.co/cCtZGyR/viko.jpg" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>
</template>

<style>
.viko-style {
  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
}
</style>
