export default {
  install(app) {
    const components = import.meta.glob('../components/common/*.vue', { eager: true });

    Object.entries(components).forEach(([path, module]) => {
      const component = module.default;
      const name = component.name || path.split('/').pop().replace('.vue', '');
      app.component(name, component);
    });
  },
};
