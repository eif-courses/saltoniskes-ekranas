<script>
import SimpleKeyboard from '../components/SimpleKeyboard'
import EmployeeList from '~/components/EmployeeList.vue'
// https://vue-i18n.intlify.dev/guide/integrations/nuxt3.html#optimize-with-intlify-unplugin-vue-i18n
export default {
  name: 'App',
  data: () => ({
    input: 'Administracija',
    cat: 'Administracija',
    isVisible: true,
    hideList: true,
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

  computed: {
    searchedProducts() {
      return this.employees.filter((product) => {
        return (
          product.category.toLowerCase().includes(this.input.toLowerCase())
        )
      })
    },
    searchedProductsEnglish() {
      return this.employees.filter((product) => {
        return (
          product.categoryEn.toLowerCase().includes(this.input.toLowerCase())
        )
      })
    },
  },

  async mounted() {
    this.hideList = false
    this.language = this.$route.query.lang
    this.$i18n.locale = this.$route.query.lang
    const client = useSupabaseClient()
    const { data, error } = await client.from('posts').select('*')

    if (error) {
      console.error(error)
      // alert('Unable to fetch records!')
    }
    else {
      const arr = []
      const arrEnglish = []
      for (const d of data)
        arr.push(d.category)

      for (const d of data)
        arrEnglish.push(d.categoryEn)
      this.postsEn = [...new Set(arrEnglish)]
      this.posts = [...new Set(arr)]
      this.employees = data
    }
  },
  methods: {
    onChange(input) {
      this.input = input
    },
    onKeyPress(button) {
      // eslint-disable-next-line no-console
      console.log('button', button)
    },
    onInputChange(input) {
      this.input = input.target.value
    },
    display(input) {
      this.input = input
      this.cat = input
      this.isVisible = false
      this.hideList = true
    },
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
  <div id="app">
    <div>
      <Toolbar>
        <template #start>
          <div v-if="isVisible === false">
            <div class="flex  pl-7">
              <div class="mt-1 text-2xl">
                {{ $t('category') }} > {{ input }}
              </div>
              <Divider layout="vertical" />
              <div class="mt-1">
                <Button icon="pi pi-times" class="p-button-danger" @click="isVisible = true, hideList = false" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex pl-7">
              <a :href="`/kategorija?lang=${language}`" class="no-underline">
                <button class="button-17 text-3xl w-full font-bold mr-4 bg-cyan-100" role="button">
                  {{ $t('contacts') }}
                </button>
              </a>
              <Divider layout="vertical" />
              <a :href="`/aktualu?lang=${language}`" class="no-underline">
                <button class="button-17 text-2xl w-full font-bold" role="button">
                  {{ $t('search') }}
                </button>
              </a>
              <Divider layout="vertical" />
            </div>
          </div>
        </template>
        <template #end>
          <button v-show="isVisible" class="button-17 text-2xl mr-7 font-bold" role="button" @click="changeLanguage">
            <img v-if="language === 'lt'" src="/lt.png" width="48" alt="LT">
            <img v-else src="/en.webp" width="48" alt="EN">
            &nbsp;{{ $i18n.locale = language }}
          </button>
        </template>
      </Toolbar>
    </div>

    <div
      v-show="isVisible"
      class="surface-ground px-4 py-5 md:px-6 lg:px-8"
    >
      <div v-if="language === 'lt'" class="grid">
        <div
          v-for="post of posts" :key="post"
          class="col-12 md:col-6"
        >
          <div>
            <button class="button-17 text-4xl text-center w-full h-full font-bold p-5" role="button" @click="display(post)">
              {{ post }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="grid">
        <div
          v-for="postEnglish of postsEn" :key="postEnglish"
          class="col-12 md:col-6"
        >
          <div>
            <button class="button-17 text-4xl w-full h-full font-bold p-5" role="button" @click="display(postEnglish)">
              {{ postEnglish }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="hideList" id="app">
      <div
        class="surface-ground px-4 py-5 md:px-6 lg:px-8"
      >
        <div v-if="language === 'lt'" class="grid">
          <div
            v-for="post of searchedProducts" :key="post.id"
            class="col-12 md:col-6"
          >
            <button class="button-55 text-gray-600 w-full text-2xl text-left" role="button">
              <span v-if="language === 'lt'" class="text-bluegray-500 font-bold">{{ post.jobType }}</span>
              <span v-else class="text-bluegray-500 font-bold">{{ post.jobTypeEn }}</span>
              <br> {{ post.name }}<br>
              Tel. {{ post.phone }}<br>
              {{ post.classroom }} kab. <br>
            </button>
          </div>
        </div>

        <div v-else class="grid">
          <div
            v-for="pEng of searchedProductsEnglish" :key="pEng.id"
            class="col-12 md:col-6"
          >
            <button class="button-55 text-gray-600 w-full text-2xl text-left" role="button">
              <span v-if="language === 'en'" class="text-bluegray-500 font-bold">{{ pEng.jobTypeEn }}</span>
              <span v-else class="text-bluegray-500 font-bold">{{ pEng.jobType }}</span>
              <br> {{ pEng.name }}<br>
              Tel. {{ pEng.phone }}<br>
              {{ pEng.classroom }} kab. <br>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-button,
.p-splitbutton {
  margin-bottom: 0.5rem;
}
.p-inputtext{
  width: 750px!important;
}
.simple-keyboard{
  visibility: hidden!important;
}

                                                     /* CSS */
                                                   .button-17 {
                                                     align-items: center;
                                                     appearance: none;
                                                     background-color: #fff;
                                                     border-radius: 24px;
                                                     border-style: none;
                                                     box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
                                                     box-sizing: border-box;
                                                     color: #3c4043;
                                                     cursor: pointer;
                                                     display: inline-flex;
                                                     fill: currentcolor;
                                                     font-family: "Google Sans",Roboto,Arial,sans-serif;
                                                     font-size: 14px;
                                                     font-weight: 500;
                                                     height: 48px;
                                                     justify-content: center;
                                                     letter-spacing: .25px;
                                                     line-height: normal;
                                                     max-width: 100%;
                                                     overflow: visible;
                                                     padding: 2px 24px;
                                                     position: relative;
                                                     text-align: center;
                                                     text-transform: none;
                                                     transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     width: auto;
                                                     will-change: transform,opacity;
                                                     z-index: 0;
                                                   }

.button-17:hover {
  background: #F6F9FE;
  color: #174ea6;
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17:focus {
  outline: none;
  border: 2px solid #4285f4;
}

.button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}
                                                     /* CSS */
                                                   .button-52 {
                                                     font-size: 16px;
                                                     font-weight: 200;
                                                     letter-spacing: 1px;
                                                     padding: 13px 20px 13px;
                                                     outline: 0;
                                                     border: 1px solid black;
                                                     cursor: pointer;
                                                     position: relative;
                                                     background-color: rgba(0, 0, 0, 0);
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-52:after {
  content: "";
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0px;
  left: 0px;
}

@media (min-width: 768px) {
  .button-52 {
    padding: 13px 50px 13px;
  }
}
                                                     /* CSS */
                                                   .button-54 {
                                                     font-family: "Open Sans", sans-serif;
                                                     font-size: 16px;
                                                     letter-spacing: 2px;
                                                     text-decoration: none;
                                                     text-transform: uppercase;
                                                     color: #000;
                                                     cursor: pointer;
                                                     border: 3px solid;
                                                     padding: 0.25em 0.5em;
                                                     box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
                                                     position: relative;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-54:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  .button-54 {
    padding: 0.25em 0.75em;
  }
}
                                                     /* CSS */
                                                   .button-11 {
                                                     display: flex;
                                                     flex-direction: column;
                                                     align-items: center;
                                                     padding: 6px 14px;
                                                     font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
                                                     border-radius: 6px;
                                                     color: #3D3D3D;
                                                     background: #fff;
                                                     border: none;
                                                     box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-11:focus {
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
                                                     /* CSS */
                                                   .button-83 {
                                                     background-color: transparent;
                                                     background-image: linear-gradient(to bottom, #fff, #f8eedb);
                                                     border: 0 solid #e5e7eb;
                                                     border-radius: .5rem;
                                                     box-sizing: border-box;
                                                     color: #482307;
                                                     column-gap: 1rem;
                                                     cursor: pointer;
                                                     display: flex;
                                                     font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                                                     font-size: 100%;
                                                     font-weight: 700;
                                                     line-height: 24px;
                                                     margin: 0;
                                                     outline: 2px solid transparent;
                                                     padding: 1rem 1.5rem;
                                                     text-align: center;
                                                     text-transform: none;
                                                     transition: all .1s cubic-bezier(.4, 0, .2, 1);
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     box-shadow: -6px 8px 10px rgba(81,41,10,0.1),0px 2px 2px rgba(81,41,10,0.2);
                                                   }

.button-83:active {
  background-color: #f3f4f6;
  box-shadow: -1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15);
  transform: translateY(0.125rem);
}

.button-83:focus {
  box-shadow: rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2);
}

                                                     /* CSS */
                                                   .button-29 {
                                                     align-items: center;
                                                     appearance: none;
                                                     background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
                                                     border: 0;
                                                     border-radius: 6px;
                                                     box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
                                                     box-sizing: border-box;
                                                     color: #fff;
                                                     cursor: pointer;
                                                     display: inline-flex;
                                                     font-family: "JetBrains Mono",monospace;
                                                     height: 48px;
                                                     justify-content: center;
                                                     line-height: 1;
                                                     list-style: none;
                                                     overflow: hidden;
                                                     padding-left: 16px;
                                                     padding-right: 16px;
                                                     position: relative;
                                                     text-align: left;
                                                     text-decoration: none;
                                                     transition: box-shadow .15s,transform .15s;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     white-space: nowrap;
                                                     will-change: box-shadow,transform;
                                                     font-size: 18px;
                                                   }

.button-29:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}

                                                     /* CSS */
                                                   .button-14 {
                                                     background-image: linear-gradient(#f7f8fa ,#e7e9ec);
                                                     border-color: #adb1b8 #a2a6ac #8d9096;
                                                     border-style: solid;
                                                     border-width: 1px;
                                                     border-radius: 3px;
                                                     box-shadow: rgba(255,255,255,.6) 0 1px 0 inset;
                                                     box-sizing: border-box;
                                                     color: #0f1111;
                                                     cursor: pointer;
                                                     display: inline-block;
                                                     font-family: "Amazon Ember",Arial,sans-serif;
                                                     font-size: 14px;
                                                     height: 29px;
                                                     font-size: 13px;
                                                     outline: 0;
                                                     overflow: hidden;
                                                     padding: 0 11px;
                                                     text-align: center;
                                                     text-decoration: none;
                                                     text-overflow: ellipsis;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     white-space: nowrap;
                                                   }

.button-14:active {
  border-bottom-color: #a2a6ac;
}

.button-14:active:hover {
  border-bottom-color: #a2a6ac;
}

.button-14:hover {
  border-color: #a2a6ac #979aa1 #82858a;
}

.button-14:focus {
  border-color: #e77600;
  box-shadow: rgba(228, 121, 17, .5) 0 0 3px 2px;
  outline: 0;
}

.button-55 {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: 'Azo Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
                                                   .button-30 {
                                                     align-items: center;
                                                     appearance: none;
                                                     background-color: #FCFCFD;
                                                     border-radius: 4px;
                                                     border-width: 0;
                                                     box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
                                                     box-sizing: border-box;
                                                     color: #36395A;
                                                     cursor: pointer;
                                                     display: inline-flex;
                                                     font-family: 'Azo Sans', sans-serif;
                                                     height: 48px;
                                                     justify-content: center;
                                                     line-height: 1;
                                                     list-style: none;
                                                     overflow: hidden;
                                                     padding-left: 16px;
                                                     padding-right: 16px;
                                                     position: relative;
                                                     text-align: left;
                                                     text-decoration: none;
                                                     transition: box-shadow .15s,transform .15s;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     will-change: box-shadow,transform;
                                                     font-size: 28px;
                                                   }

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

                                                   .button-39 {
                                                     background-color: #FFFFFF;
                                                     border: 1px solid rgb(209,213,219);
                                                     border-radius: .5rem;
                                                     box-sizing: border-box;
                                                     color: #111827;
                                                     font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                                                     font-size: .875rem;
                                                     font-weight: 600;
                                                     line-height: 1.25rem;
                                                     padding: .75rem 1rem;
                                                     text-align: center;
                                                     text-decoration: none #D1D5DB solid;
                                                     text-decoration-thickness: auto;
                                                     box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                                                     cursor: pointer;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-39:hover {
  background-color: rgb(249,250,251);
}

.button-39:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.button-39:focus-visible {
  box-shadow: none;
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

                                                 .button-8 {
                                                   background-color: #e1ecf4;
                                                   border-radius: 3px;
                                                   border: 1px solid #7aa7c7;
                                                   box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
                                                   box-sizing: border-box;
                                                   color: #39739d;
                                                   cursor: pointer;
                                                   display: inline-block;
                                                   font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
                                                   font-size: 13px;
                                                   font-weight: 400;
                                                   line-height: 1.15385;
                                                   margin: 0;
                                                   outline: none;
                                                   padding: 8px .8em;
                                                   position: relative;
                                                   text-align: center;
                                                   text-decoration: none;
                                                   user-select: none;
                                                   -webkit-user-select: none;
                                                   touch-action: manipulation;
                                                   vertical-align: baseline;
                                                 }

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
</style>
