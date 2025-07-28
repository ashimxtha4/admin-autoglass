export const api = {
  // vehicle
  vehicle: {
    make: {
      get: '/vehicle_brand',
      post: '/general/vehicle_brand_list'
    },
    model: {
      get: '/vehicle_model',
      post: '/general/vehicle_model_list'
    },
    group: {
      get: '/vehicle_group',
      post: '/general/vehicle_position_list'
    },
    body: {
      get: '/vehicle_body',
      post: '/general/vehicle_type_list'
    },
    year: {
      get: '/vehicle_year'
    },
    series: {
      get: '/vehicle_series',
      post: '/general/vehicle_series_list'
    }
  },
  // admin
  admin: {
    login: {
      post: '/login'
    },
    customer: {
      list: {
        get: (page: number) => `/customer/list?page=${page}`
      },
      quote: {
        list: {
          get: (page: number) => `/admin/customer/quotes?page=${page}`
        },
        detail: {
          get: (id: number) => `/admin/customer/quotes/${id}`
        },
        reply: {
          post: '/admin/customer/quote_reply'
        }
      },
      orders: {
        product: {
          get: (page: number) => `/admin/customer/orders?page=${page}`
        },
        dispatch: {
          post: '/admin/customer/orders/dispatch'
        },
        status: {
          post: '/admin/customer/orders/change_status'
        }
      }
    },
    product: {
      add: {
        post: '/product'
      },
      list: {
        get: (page: number) => `/product?page=${page}`
      },
      import: {
        post: '/product/import'
      },
      detail: {
        get: (id: number) => `/product/${id}`
      },
      edit: {
        patch: (id: number) => `/product/${id}`
      }
    },
    glassType: {
      list: {
        get: '/glasstype'
      },
      add: {
        post: '/glasstype'
      }
    },
    vehicle: {
      make: {
        create: {
          post: '/vehicle_brand'
        },
        list: {
          get: (page: number) => `/vehicle_brand?page=${page}`
        }
      },
      // body
      type: {
        create: {
          post: '/vehicle_type'
        },
        list: {
          get: (page: number) => `/vehicle_type?page=${page}`
        }
      },
      position: {
        create: {
          post: '/vehicle_position'
        },
        list: {
          get: (page: number) => `/vehicle_position?page=${page}`
        }
      },
      model: {
        create: {
          post: '/vehicle_model'
        },
        list: {
          get: (page: number) => `/vehicle_model?page=${page}`
        }
      },
      series: {
        create: {
          post: '/vehicle_series'
        },
        list: {
          get: (page: number) => `/vehicle_series?page=${page}`
        }
      }
    }
  }
}
