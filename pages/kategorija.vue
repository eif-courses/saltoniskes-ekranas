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
    const client = useSupabaseClient()
    const { data, error } = await client.from('posts').select('*')

    if (error) {
      console.error(error)
      alert('Unable to fetch records!')
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
                <Button icon="pi pi-times" class="p-button-danger" @click="isVisible = true" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex pl-7">
              <a href="/kategorija" class="no-underline">
                <button class="button-30 text-3xl w-full font-bold mr-4 bg-green-200" role="button">
                  {{ $t('contacts') }}
                </button>
              </a>
              <Divider layout="vertical" />
              <a :href="`aktualu?lang=${language}`" class="no-underline">
                <button class="button-30 text-2xl w-full font-bold" role="button">
                  {{ $t('search') }}
                </button>
              </a>
              <Divider layout="vertical" />
              <a href="/aktualu" class="no-underline">
                <button class="button-30 text-2xl w-full font-bold" role="button">
                  {{ $t('news') }}
                </button>
              </a>
              <Divider layout="vertical" />
            </div>
          </div>
        </template>
        <template #end>
          <button v-show="isVisible" class="button-30 text-2xl mr-7 font-bold" role="button" @click="changeLanguage">
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
            <button class="button-30 text-2xl w-full font-bold p-5" role="button" @click="display(post)">
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
            <button class="button-30 text-2xl w-full font-bold p-5" role="button" @click="display(postEnglish)">
              {{ postEnglish }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="app">
      <div
        class="surface-ground px-4 py-5 md:px-6 lg:px-8"
      >
        <div v-if="language === 'lt'" class="grid">
          <div
            v-for="post of searchedProducts" :key="post.id"
            class="col-12 md:col-6"
          >
            <button class="button-8 text-gray-600 w-full text-2xl text-left" role="button">
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
            <button class="button-8 text-gray-600 w-full text-2xl text-left" role="button">
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
                                                   white-space: nowrap;
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
