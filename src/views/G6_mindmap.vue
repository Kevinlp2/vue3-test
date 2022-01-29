<template>
  <div ref="mindmapBox" class="box">

  </div>
</template>

<script>
  import G6 from '@antv/g6';

  export default {
    name: "g6_mindmap2",
    props:{
      mockdata:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    created(){

    },
    mounted() {


      // mocked data
      let mockData = {
        id: 'g1',
        name: 'Name1',
        count: 123456,
        label: '538.90',
        currency: 'Yuan',
        rate: 1.0,
        status: 'B',
        variableName: 'V1',
        variableValue: 0.341,
        variableUp: false,
        children: [
          {
            id: 'g12',
            name: 'Deal with LONG label LONG label LONG label LONG label',
            count: 123456,
            label: '338.00',
            rate: 0.179,
            status: 'R',
            currency: 'Yuan',
            variableName: 'V2',
            variableValue: 0.179,
            variableUp: true,
            children: [
              {
                id: 'g121',
                name: 'Name3',
                collapsed: true,
                count: 123456,
                label: '138.00',
                rate: 0.123,
                status: 'B',
                currency: 'Yuan',
                variableName: 'V2',
                variableValue: 0.27,
                variableUp: true,
                children: [
                  {
                    id: 'g1211',
                    name: 'Name4',
                    collapsed: true,
                    count: 123456,
                    label: '138.00',
                    rate: 1.0,
                    status: 'B',
                    currency: 'Yuan',
                    variableName: 'V1',
                    variableValue: 0.164,
                    variableUp: false,
                    children: [],
                  },
                ],
              },
              {
                id: 'g122',
                name: 'Name5',
                collapsed: true,
                count: 123456,
                label: '100.00',
                rate: 0.296,
                status: 'G',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.259,
                variableUp: true,
                children: [
                  {
                    id: 'g1221',
                    name: 'Name6',
                    // collapsed: true,
                    count: 123456,
                    label: '40.00',
                    rate: 0.4,
                    status: 'G',
                    currency: 'Yuan',
                    variableName: 'V1',
                    variableValue: 0.135,
                    variableUp: true,
                    children: [
                      {
                        id: 'g12211',
                        name: 'Name6-1',
                        collapsed: true,
                        count: 123456,
                        label: '40.00',
                        rate: 1.0,
                        status: 'R',
                        currency: 'Yuan',
                        variableName: 'V1',
                        variableValue: 0.181,
                        variableUp: true,
                        children: [],
                      },
                    ],
                  },
                  {
                    id: 'g1222',
                    name: 'Name7',
                    collapsed: true,
                    count: 123456,
                    label: '60.00',
                    rate: 0.6,
                    status: 'G',
                    currency: 'Yuan',
                    variableName: 'V1',
                    variableValue: 0.239,
                    variableUp: true,
                    children: [],
                  },
                ],
              },
              {
                id: 'g123',
                name: 'Name8',
                collapsed: true,
                count: 123456,
                label: '100.00',
                rate: 0.296,
                status: 'DI',
                currency: 'Yuan',
                variableName: 'V2',
                variableValue: 0.131,
                variableUp: false,
                children: [
                  {
                    id: 'g1231',
                    name: 'Name8-1',
                    count: 123456,
                    label: '100.00',
                    rate: 1.0,
                    status: 'DI',
                    currency: 'Yuan',
                    variableName: 'V2',
                    variableValue: 0.131,
                    variableUp: false,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'g13',
            name: 'Name9',
            count: 123456,
            label: '100.90',
            rate: 0.187,
            status: 'B',
            currency: 'Yuan',
            variableName: 'V2',
            variableValue: 0.221,
            variableUp: true,
            children: [
              {
                id: 'g131',
                name: 'Name10',
                collapsed: true,
                count: 123456,
                label: '33.90',
                rate: 0.336,
                status: 'R',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.12,
                variableUp: true,
                children: [
                  {
                    id: 'g1310',
                    name: 'Name12',
                    count: 123456,
                    label: '33.90',
                    rate: 0.336,
                    status: 'R',
                    currency: 'Yuan',
                    variableName: 'V1',
                    variableValue: 0.12,
                    variableUp: true,
                    children: [],
                  },
                ],
              },
              {
                id: 'g132',
                name: 'Name11',
                count: 123456,
                label: '67.00',
                rate: 0.664,
                status: 'G',
                currency: 'Yuan',
                variableName: 'V1',
                variableValue: 0.241,
                variableUp: false,
                children: [],
              },
            ],
          },
          {
            id: 'g14',
            name: 'Name12',
            count: 123456,
            label: '100.00',
            rate: 0.186,
            status: 'G',
            currency: 'Yuan',
            variableName: 'V2',
            variableValue: 0.531,
            variableUp: true,
            children: [],
          },
        ],
      };
      let colors = {
        B: '#5B8FF9',
        R: '#F46649',
        Y: '#EEBC20',
        G: '#5BD8A6',
        DI: '#A7A7A7',
      };

      //  组件props
      const props = {
        data: mockData,
        config: {
          padding: [20, 50],
          defaultLevel: 3,
          defaultZoom: 0.8,
          modes: {default: ['zoom-canvas', 'drag-canvas']},
        },
      };

      const container = this.$refs.mindmapBox;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      // 默认配置
      const defaultConfig = {
        width,
        height,
        modes: {
          default: ['zoom-canvas', 'drag-canvas'],
        },
        fitView: true,
        fitViewPadding: 40,
        fitCenter: true, //开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView。
        animate: true,
        defaultNode: {
          type: 'flow-rect',
        },
        defaultEdge: {
          type: 'flow-cubic',
          // style: {
          //   stroke: '#CED4D9',
          // },
        },
        layout: {
          type: 'compactBox',
          // type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 300,
          getHeight: () => {
            return 60;
          },
          getHGap: () => {
            return 100
          }
        },
      };

      // 自定义节点、边
      const registerFn = () => {
        /**
         * 自定义节点
         */
        G6.registerNode(
          'flow-rect',
          {
            shapeType: 'flow-rect',
            draw(cfg, group) {
              const {
                name = '',
                variableName,
                variableValue,
                variableUp,
                label,
                collapsed,
                currency,
                status,
                rate,
              } = cfg;
              const grey = '#CED4D9';
              // 逻辑不应该在这里判断
              const rectConfig = {
                width: 202,
                height: 60,
                lineWidth: 1,
                fontSize: 12,
                fill: '#fff',
                radius: 4,
                stroke: grey,
                opacity: 1,
              };

              const nodeOrigin = {
                x: -rectConfig.width / 2,
                y: -rectConfig.height / 2,
              };

              const textConfig = {
                textAlign: 'left',
                textBaseline: 'bottom',
              };

              const rect = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: nodeOrigin.y,
                  ...rectConfig,
                },
              });

              const rectBBox = rect.getBBox();

              // label title 标题
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 20 + nodeOrigin.y,
                  text: name.length > 28 ? name.substr(0, 28) + '...' : name,
                  fontSize: 12,
                  opacity: 0.85,
                  fill: '#000',
                  cursor: 'pointer',
                },
                name: 'name-shape',
              });

              // price
              const price = group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: rectBBox.maxY - 12,
                  text: label,
                  fontSize: 16,
                  fill: '#000',
                  opacity: 0.85,
                },
              });

              // label currency
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: price.getBBox().maxX + 5,
                  y: rectBBox.maxY - 12,
                  text: currency,
                  fontSize: 12,
                  fill: '#000',
                  opacity: 0.75,
                },
              });

              // percentage
              const percentText = group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: rectBBox.maxX - 8,
                  y: rectBBox.maxY - 12,
                  text: `${((rate || 0) * 100).toFixed(2)}%`,
                  fontSize: 12,
                  textAlign: 'right',
                  fill: colors[status],
                },
              });

              // percentage triangle
              const symbol = variableUp ? 'triangle' : 'triangle-down';
              const triangle = group.addShape('marker', {
                attrs: {
                  ...textConfig,
                  x: percentText.getBBox().minX - 10,
                  y: rectBBox.maxY - 12 - 6,
                  symbol,
                  r: 6,
                  fill: colors[status],
                },
              });

              // variable name
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: triangle.getBBox().minX - 4,
                  y: rectBBox.maxY - 12,
                  text: variableName,
                  fontSize: 12,
                  textAlign: 'right',
                  fill: '#000',
                  opacity: 0.45,
                },
              });

              // bottom line background
              const bottomBackRect = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: rectBBox.maxY - 4,
                  width: rectConfig.width,
                  height: 4,
                  radius: [0, 0, rectConfig.radius, rectConfig.radius],
                  fill: '#E0DFE3',
                },
              });

              // bottom percent 底部进度条
              const bottomRect = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: rectBBox.maxY - 4,
                  width: rate * rectBBox.width,
                  height: 4,
                  radius: [0, 0, rate*1 == 1?rectConfig.radius:0, rectConfig.radius],
                  fill: colors[status],
                },
              });

              // collapse rect
              if (cfg.children && cfg.children.length) {
                group.addShape('rect', {
                  attrs: {
                    x: rectConfig.width / 2 - 8,
                    y: -9,
                    width: 16,
                    height: 16,
                    stroke: 'rgba(0, 0, 0, 0.25)',
                    cursor: 'pointer',
                    fill: '#fff',
                  },
                  name: 'collapse-back',
                  modelId: cfg.id,
                });

                // collpase text
                group.addShape('text', {
                  attrs: {
                    x: rectConfig.width / 2,
                    y: -1,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: collapsed ? '+' : '-',
                    fontSize: 16,
                    cursor: 'pointer',
                    fill: 'rgba(0, 0, 0, 0.25)',
                  },
                  name: 'collapse-text',
                  modelId: cfg.id,
                });
              }

              this.drawLinkPoints(cfg, group);
              return rect;
            },
            update(cfg, item) {
              const group = item.getContainer();
              this.updateLinkPoints(cfg, group);
            },
            setState(name, value, item) {
              if (name === 'collapse') {
                const group = item.getContainer();
                const collapseText = group.find((e) => e.get('name') === 'collapse-text');
                if (collapseText) {
                  if (!value) {
                    collapseText.attr({
                      text: '-',
                    });
                  } else {
                    collapseText.attr({
                      text: '+',
                    });
                  }
                }
              }
            },
            getAnchorPoints() {
              return [
                [0, 0.5],
                [1, 0.5],
              ];
            },
          },
          'rect',
        );

        G6.registerEdge(
          'flow-cubic',
          {
            draw(cfg, group) {
              const startPoint = cfg.startPoint;
              const endPoint = cfg.endPoint;

              const shape = group.addShape('path', {
                attrs: {
                  stroke: colors[cfg.targetNode._cfg.model.status], //自定义连接线的颜色
                  lineWidth: 1,
                  path: [
                    ['M', startPoint.x, startPoint.y],
                    // ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
                    // ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
                    ['L', endPoint.x, endPoint.y],
                  ],
                },
                // name: 'path-shape',
              });
              return shape;
            },
            //连线上添加内容
            // afterDraw(cfg, group) {
            //   // 获取图形组中的第一个图形，在这里就是边的路径图形
            //   const shape = group.get('children')[0];
            //   // 获取路径图形的中点坐标
            //   const midPoint = shape.getPoint(0.5);
            //   group.addShape('text', {
            //     attrs: {
            //       x: midPoint.x ,
            //       y: midPoint.y,
            //       text: '测试数据',
            //       fontSize: 12,
            //       textAlign: 'center',
            //       fill: '#000',
            //       opacity: 0.45,
            //     },
            //   });
            // },
            //连线动画
            // afterDraw(cfg, group) {
            //   const shape = group.get('children')[0];
            //   const length = shape.getTotalLength();
            //   shape.animate(
            //     (ratio) => {
            //       const startLen = ratio * length;
            //       const cfg = {
            //         lineDash: [startLen, length - startLen],
            //       };
            //       return cfg;
            //     },
            //     {
            //       repeat: false,
            //       duration: 1000,
            //     },
            //   );
            // },
          },
          'cubic-horizontal',
        );
      };

      registerFn();

      const {data} = props;
      let graph = null;

      const initGraph = (data) => {
        if (!data) {
          return;
        }
        const {onInit, config} = props;
        const tooltip = new G6.Tooltip({
          // offsetX and offsetY include the padding of the parent container
          offsetX: 20,
          offsetY: 30,
          // the types of items that allow the tooltip show up
          // 允许出现 tooltip 的 item 类型
          itemTypes: ['node'],
          // custom the tooltip's content
          // 自定义 tooltip 内容
          getContent: (e) => {
            const outDiv = document.createElement('div');
            //outDiv.style.padding = '0px 0px 20px 0px';
            const nodeName = e.item.getModel().name;
            let formatedNodeName = '';
            for (let i = 0; i < nodeName.length; i++) {
              formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
              if (i !== 0 && i % 20 === 0) formatedNodeName = `${formatedNodeName}<br/>`;
            }
            outDiv.innerHTML = `${formatedNodeName}`;
            return outDiv;
          },
          shouldBegin: (e) => {
            if (e.target.get('name') === 'name-shape') return true;
            return false;
          },
        });
        graph = new G6.TreeGraph({
          container: this.$refs.mindmapBox,
          ...defaultConfig,
          ...config,
          plugins: [tooltip],
        });
        if (typeof onInit === 'function') {
          onInit(graph);
        }
        graph.data(data);
        graph.render();
        graph.zoom(config.defaultZoom || 1);

        const handleCollapse = (e) => {
          const target = e.target;
          const id = target.get('modelId');
          const item = graph.findById(id);
          const nodeModel = item.getModel();
          nodeModel.collapsed = !nodeModel.collapsed;
          graph.layout();
          graph.setItemState(item, 'collapse', nodeModel.collapsed);
        };
        graph.on('collapse-text:click', (e) => {
          handleCollapse(e);
        });
        graph.on('collapse-back:click', (e) => {
          handleCollapse(e);
        });
      };

      initGraph(data);

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }
</style>