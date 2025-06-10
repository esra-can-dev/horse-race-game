import { createStore } from 'vuex';

const modules = {};
const files = import.meta.glob('./modules/*.js', { eager: true });

for (const path in files) {
  const moduleName = path.match(/\.\/modules\/(.*)\.js$/)[1];
  modules[moduleName] = files[path].default;
}

export default createStore({
  modules,
});
