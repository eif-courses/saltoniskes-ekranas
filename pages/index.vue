<script>
export default {
  name: 'App',
  data: () => ({
    input: '',
    cat: 'Administracija',
    isVisible: true,
    posts: [],
    postsEn: [],
    language: 'lt',
    employees: [],
    items: [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
      {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
          window.location.href = 'https://vuejs.org/'
        },
      },
      {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
          window.location.hash = '/fileupload'
        },
      },
    ],
  }),

  methods: {
    changeLanguage() {
      if (this.language === 'en')
        this.language = 'lt'
      else
        this.language = 'en'
    },
  },
}
</script>

<template>
  <div class="viko-style grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
      <section>
        <button class="button-6 text-2xl mr-7 font-bold" role="button" @click="changeLanguage">
          <img v-if="language === 'lt'" src="/lt.png" width="48" alt="LT">
          <img v-else src="/en.webp" width="48" alt="EN">
          &nbsp;{{ $i18n.locale = language }}
        </button>
        <DigitalClock />

        <span class="block text-white text-6xl font-bold mb-1">{{ $t('info') }}</span>
        <br>

        <a :href="`/kategorija?lang=${language}`" class="no-underline">
          <Button class="mr-3 p-button-raised p-button-rounded p-button-lg"> {{ $t('search') }}</Button>
        </a>
        <a :href="`/naujienos?lang=${language}`" class="no-underline">

          <Button class="p-button-raised p-button-rounded p-button-lg">{{ $t('news') }} </Button>
        </a>
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img src="https://i.ibb.co/cCtZGyR/viko.jpg" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>
</template>

<style scoped>
.viko-style {
  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
}

.button-6 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
