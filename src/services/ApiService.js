import BaseService from "./BaseService";

const ApiService = {
  fetchData(param) {
    return new Promise((resolve, reject) => {
      BaseService(param)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  getCompanyCards() {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "GET",
        url: "/super-admin/company-cards",
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  getPlotList({ page = 1, search } = {}) {
    return new Promise((resolve, reject) => {
      const params = { page };
      if (search) {
        params.search = search;
      }
      BaseService({
        method: "GET",
        url: "/super-admin/plot-list",
        params,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  createPlot(formData) {
    return new Promise((resolve, reject) => {
      const config = {
        method: "POST",
        url: "/super-admin/create-plot",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      BaseService(config)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  editPlot(formData) {
    return new Promise((resolve, reject) => {
      const config = {
        method: "POST",
        url: "/super-admin/edit-plot",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      BaseService(config)
        .then((response) => resolve(response))
        .catch((errors) => reject(errors));
    });
  },

  deletePlot(id) {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "GET",
        url: "/super-admin/delete-plot",
        params: { id },
      })
        .then((response) => resolve(response))
        .catch((errors) => reject(errors));
    });
  },

  getCompanyList({
    page = 1,
    status = "active",
    perPage,
    search,
    upcoming_subscription,
    expired_subscription,
  } = {}) {
    return new Promise((resolve, reject) => {
      const params = { page, status, perPage };

      if (search) params.search = search;
      if (upcoming_subscription !== null)
        params.upcoming_subscription = upcoming_subscription;
      if (expired_subscription !== null)
        params.expired_subscription = expired_subscription;

      BaseService({
        method: "GET",
        url: "/super-admin/company-list",
        params,
      })
        .then(resolve)
        .catch(reject);
    });
  },


  createCompany(formData) {
    return new Promise((resolve, reject) => {
      const config = {
        method: "POST",
        url: "/super-admin/create-company",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      BaseService(config)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  getCompanyDetails(companyId) {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "GET",
        url: "/super-admin/company-details",
        params: { id: companyId },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  cashPayment(formData) {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "POST",
        url: "/super-admin/cash-payment",
        data: formData,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  createStripePaymentUrl(formData) {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "POST",
        url: "/super-admin/create-stripe-payment-url",
        data: formData,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },

  getSubscriptionList() {
    return new Promise((resolve, reject) => {
      BaseService({
        method: "GET",
        url: "/super-admin/subscription-list",
      })
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },
};

export default ApiService;
