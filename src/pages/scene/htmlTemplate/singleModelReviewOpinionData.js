let opinionData = {
  status: "FINISH",
  tabs: [
    {
      status: "0",
      tabName: "不合规",
      tabType: "notPass",
      count: 1,
      list: [
          {
              status: "0",
              name: "《建筑设计防火规范》GB 50016 5.5.30",
              articleContent: "住宅建筑的户门、安全出口、疏散走道和疏散楼梯的各自总净宽度应经计算确定，且户门和安全出口的净宽度不应小于0.90m，疏散走道、疏散楼梯和首层疏散外门的净宽度不应小于1.10m。建筑高度不大于18m 的住宅中一边设置栏杆的疏散楼梯，其净宽度不应小于1.0m。",
              opinionText: "不符合:《建筑设计防火规范》GB 50016 5.5.30住宅建筑户门和安全出口的疏散宽度",
              checkPointCount: 2,
              passCount: 263,
              errCount: 193,
              doubtCount: 0,
              elementNum: 193,
              strong: true,
              adoption: false,
              detail: [
                  {
                      drawingId: "",
                      modelId: "",
                      status: "1",
                      message: "住宅建筑疏散楼梯的净宽度",
                      content: "住宅建筑疏散楼梯的净宽度",
                      elementResults: [
                          {
                              result: "当前梯段梯段宽度是：1200.0(规范值: 大于等于1200)",
                              componentId: "2961361",
                              componentName: "整体梯段: 剪刀楼梯-5 120mm 结构深度",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前梯段梯段宽度是：1200.0(规范值: 大于等于1200)",
                              componentId: "2961363",
                              componentName: "整体梯段: 剪刀楼梯-5 120mm 结构深度",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前梯段梯段宽度是：1200.0(规范值: 大于等于1200)",
                              componentId: "2964088",
                              componentName: "整体梯段: 剪刀楼梯-5 120mm 结构深度",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前梯段梯段宽度是：1200.0(规范值: 大于等于1200)",
                              componentId: "2964090",
                              componentName: "整体梯段: 剪刀楼梯-5 120mm 结构深度",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          }
                      ]
                  },
                  {
                      drawingId: "",
                      modelId: "",
                      status: "0",
                      message: "违反审查点规则：住宅建筑户门和安全出口的疏散宽度",
                      content: "住宅建筑户门和安全出口的疏散宽度",
                      elementResults: [
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3025030",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3025026",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3024885",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3025167",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3024794",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3024887",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3024884",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3024883",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3024806",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3024881",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3024807",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3023390",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3023352",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3023609",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3023395",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3023392",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3023391",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3022683",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3022440",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3022303",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3022299",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3022513",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3022079",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3022154",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3022080",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3022067",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3022158",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3022160",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3022157",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3022156",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3020664",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3020665",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3019956",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3020663",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3020625",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3020882",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3020668",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3019713",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3019576",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3019786",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3019430",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3019429",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3019352",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3019427",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3019353",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3019572",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3019431",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2947575",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3019433",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2954660",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2955537",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2955499",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2954446",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2954305",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2954307",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2954304",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2954587",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2954450",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3041863",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2954214",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3041860",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3041224",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3041859",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3041858",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3041820",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2954303",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2954226",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2954301",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2954227",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2952772",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3041097",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2953029",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2952815",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2952812",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2952811",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2952103",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3041138",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2952810",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2951860",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2951723",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2951933",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2951499",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2951574",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2951500",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3041008",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2951719",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2951578",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2951580",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2951577",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2951576",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3040926",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2950088",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2949376",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3040853",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2950085",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3040854",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2950084",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3040924",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2950083",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2951487",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3041004",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3040928",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2950302",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3040927",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2949206",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3029063",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3028849",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3028846",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2950045",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3040849",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3028137",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3028845",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3028844",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3027967",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2949133",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2948996",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2948992",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3027894",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3028806",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3027612",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2948772",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2948847",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2948773",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3027614",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3027611",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3027610",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2948760",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3027757",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2948851",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2948853",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2948850",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2948849",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3027753",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3027533",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3027608",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3026336",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3026122",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3026119",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3027534",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3027521",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3025240",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3026118",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3025410",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3026117",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3026079",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3008525",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3008522",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3008521",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3008444",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3008519",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3008445",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2935498",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3008664",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3008523",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2935357",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2935361",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3007229",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2935216",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2935214",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3007015",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2935218",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3007012",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3007011",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2935215",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2935212",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2935138",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3008432",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2935137",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2935125",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3006133",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3053241",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2933940",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3053237",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3006303",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2933723",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3053451",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3007010",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2933722",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2933726",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3006972",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2933683",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2933014",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3053378",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2933721",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3053017",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3005919",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3053092",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3053018",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3005778",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2932844",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3005780",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3053005",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3005777",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3053096",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3006060",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3053098",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3053095",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2932771",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3053094",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3005923",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3005687",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2932634",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2932630",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2932489",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3005776",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3005699",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2932491",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3005700",
                              componentName: "M0922: M1022a 3",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3005774",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2963720",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2963011",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2932488",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2963719",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2932487",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2963718",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2932411",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2963680",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2932410",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2932485",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2932398",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2964071",
                              componentName: "M0922: FM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2963723",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2931213",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2930996",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2930287",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2930999",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2962631",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2930995",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2930994",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2930956",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2962841",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2930117",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2962485",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2962484",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2962407",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2962482",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2962408",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2930044",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2962627",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2962486",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2929907",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2961210",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2960996",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2962395",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2960114",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2960993",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2960992",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2960284",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2960991",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2960953",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2959904",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2959900",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2929903",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2959759",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2929762",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2929760",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2960041",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2929764",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2929761",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2929758",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2929684",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2929683",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2959668",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2929671",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2959761",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2959758",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2959757",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2959680",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2959755",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2959681",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2958265",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2957557",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2958264",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2958226",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2958483",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2958269",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2958266",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2957314",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2957177",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2957387",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2957030",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2957031",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2957028",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2956954",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2956953",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2957173",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2957032",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2957034",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2955756",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2955542",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2955539",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2954830",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2955538",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2956941",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2947361",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2947357",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2947356",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2947358",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2946649",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2947318",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2946479",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2946406",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3018155",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2946265",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2946269",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3017941",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3017229",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3017938",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2946124",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3017937",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2946122",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3019340",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2946126",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2946123",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2946120",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2946046",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2946045",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2946033",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3017059",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3017898",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2944848",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3017936",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2944631",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2944630",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2944634",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2944591",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2943922",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2944629",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2943752",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3016845",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3016704",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3016706",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2943542",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2943679",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3016986",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2943538",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3016849",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2943399",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3016613",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2943397",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2943396",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2943395",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2943319",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3016703",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3016702",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2943318",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2943393",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3016625",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2943306",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3016700",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3016626",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3015209",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3015171",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2942121",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2941195",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3015428",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2941903",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2941907",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3015214",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2941904",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3015211",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3015210",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2941902",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3014502",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2941864",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3014259",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3014332",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2941025",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3013979",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3013976",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3013975",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2940815",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3013973",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2940952",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3013898",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3014122",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2940811",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3014118",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2940672",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3013977",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2940670",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2940591",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2940669",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3012487",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2940668",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3012701",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2940666",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2940592",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3012484",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3013899",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2940579",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3013886",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2939394",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3011605",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2939176",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2938468",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2939180",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2939177",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3011775",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2939137",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3012483",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3012482",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2939175",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3012444",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3011395",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3011391",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3011250",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2938298",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2938088",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3011532",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2938225",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3011171",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2938084",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3011159",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2937945",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2937943",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3011252",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3011249",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2937942",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3011248",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2937941",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2937865",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2937864",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3011246",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3011172",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2937939",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3009048",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3009756",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3009755",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2937852",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3009717",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "2936453",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3009974",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2936667",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2936449",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "2935741",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3009760",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3009757",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "2936450",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2936410",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3054290",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "2936448",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3054328",
                              componentName: "M0922: M0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3008805",
                              componentName: "M0922: HM1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3008668",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "2935571",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3054547",
                              componentName: "M0922: HFM乙1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1050.0(规范值: 大于等于1000)",
                              componentId: "3008878",
                              componentName: "M0922: M1022a",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：1600.0(规范值: 大于等于1000)",
                              componentId: "3054333",
                              componentName: "TLM1622: TLM1622",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          },
                          {
                              result: "当前门宽度是：900.0(规范值: 大于等于1000)",
                              componentId: "3054329",
                              componentName: "M0922: FM乙0922",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：800.0(规范值: 大于等于1000)",
                              componentId: "3054330",
                              componentName: "M0822: M0822",
                              viewEleBox: null,
                              elementState: 0,
                              status: "0"
                          },
                          {
                              result: "当前门宽度是：2400.0(规范值: 大于等于1000)",
                              componentId: "3053621",
                              componentName: "TLM2423: TLM2423",
                              viewEleBox: null,
                              elementState: 1,
                              status: "1"
                          }
                      ]
                  }
              ]
          }
      ]
    }, {
      status: "1",
      tabName: "通过",
      tabType: "pass",
      count: 1,
      list: [
        {
          status: "1",
          name: "《住宅设计规范》GB50096 6.3.1",
          articleContent: "<p>楼梯梯段净宽不应小于1．10m，不超过六层的住宅，一边设有栏杆的梯段净宽不应小于1．00m。</p>",
          opinionText: "《住宅设计规范》GB50096 6.3.1",
          checkPointCount: 1,
          passCount: 31,
          errCount: 0,
          doubtCount: 0,
          elementNum: 0,
          strong: true,
          adoption: false,
          detail: [
            {
              drawingId: "",
              modelId: "",
              status: "1",
              message: "楼梯净宽",
              content: "楼梯净宽",
              elementResults: [
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3042823",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3042089",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3054697",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1400.0(规范值: 大于等于1200)",
                  componentId: "3043412",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3040569",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：11201.174(规范值: 大于等于1200)",
                  componentId: "3110997",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3029213",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3018305",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3021032",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3026486",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3023759",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3010124",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1400.0(规范值: 大于等于1200)",
                  componentId: "3007379",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5 2-修改",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3015578",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3012851",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2976461",
                  componentName: "现场浇注楼梯: 直段单跑楼梯-4",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2958633",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2964087",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2961360",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2950452",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2947725",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2955906",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2953179",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2939544",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2936817",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2944998",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2942271",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2699741",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2699443",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2934090",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2931363",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      status: "2",
      tabName: "未审查",
      tabType: "unexamined",
      count: 1,
      list: [
          {
              status: "2",
              name: "《住宅建筑规范》GB 50368 5.3.4",
              articleContent: "<p>供轮椅通行的走道和通道净宽不应小于1.20m。<br/></p>",
              opinionText: "《住宅建筑规范》GB 50368 5.3.4",
              checkPointCount: 1,
              passCount: 0,
              errCount: 0,
              doubtCount: 0,
              elementNum: 0,
              strong: true,
              adoption: false,
              detail: [
                  {
                      drawingId: "",
                      modelId: "",
                      status: "2",
                      message: "当前建筑电梯数量为：0（规范值：大于0）,无需审查",
                      content: "走廊等公共部位净宽",
                      elementResults: []
                  }
              ]
          }
      ]
    },
    {
      status: "-1",
      tabName: "存疑",
      tabType: "doubt",
      count: 1,
      list: [
          {
              status: "-1",
              name: "《住宅设计规范》GB50096 6.3.5",
              articleContent: "<p>楼梯井净宽大于0.11m时，必须采取防止儿童攀滑的措施。</p>",
              opinionText: "由于缺少构件或构件相关属性，无法审查《住宅设计规范》GB50096 6.3.5梯井防护措施",
              checkPointCount: 1,
              passCount: 0,
              errCount: 0,
              doubtCount: 31,
              elementNum: 0,
              strong: true,
              adoption: false,
              detail: [
                  {
                      drawingId: "",
                      modelId: "",
                      status: "-1",
                      message: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                      content: "梯井防护措施",
                      elementResults: [
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3042823",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3042089",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3054697",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3043412",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3040569",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3110997",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3029213",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3018305",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3021032",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3026486",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3023759",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3010124",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3007379",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5 2-修改",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3015578",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3012851",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2976461",
                              componentName: "现场浇注楼梯: 直段单跑楼梯-4",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2958633",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2964087",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2961360",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2950452",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2947725",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2955906",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2953179",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2939544",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2936817",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2944998",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2942271",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2699741",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2699443",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2934090",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2931363",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          }
                      ]
                  }
              ]
          }
      ]
    }
  ],
}

export default opinionData