import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
    
    getCompanyCards() {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/company-cards',
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    getPlotList({ page = 1 } = {}) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/plot-list',
                params: { page },
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    createPlot(formData) {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'POST',
                url: '/super-admin/create-plot',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            BaseService(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    editPlot(formData) {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'POST',
                url: '/super-admin/edit-plot',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            BaseService(config)
                .then((response) => resolve(response))
                .catch((errors) => reject(errors))
        })
    },

    deletePlot(id) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/delete-plot',
                params: { id },
            })
                .then((response) => resolve(response))
                .catch((errors) => reject(errors))
        })
    },

    getCompanyList({ page = 1, status = 'active' } = {}) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/company-list',
                params: { page, status },
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },


    createCompany(formData) {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'POST',
                url: '/super-admin/create-company',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            BaseService(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    getCompanyDetails(companyId) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/company-details',
                params: { id: companyId },
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    cashPayment(formData) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'POST',
                url: '/super-admin/cash-payment',
                data: formData,
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    createStripePaymentUrl(formData) {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'POST',
                url: '/super-admin/create-stripe-payment-url',
                data: formData,
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },

    getSubscriptionList() {
        return new Promise((resolve, reject) => {
            BaseService({
                method: 'GET',
                url: '/super-admin/subscription-list',
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService