module.exports = {
  attributes: {
    name: 'Atlas International',
    support: [
      {
        email: 'mark.richman@raise.com',
        name: 'Mark Richman',
        phone: '3122036261',
      },
      {
        email: 'sellersupport@raise.com',
        name: 'General Bulk Support',
        phone: '(312) 897-2009',
      },
    ],
  },
  id: 1,
  relationships: {
    employee_permissions: {
      offer_amount: true,
      payouts: true,
      sell_price: false,
    },
    employees: {
      data: [
        {
          attributes: {
            current: true,
            email: 'tom@raise.com',
            first_name: 'tom',
            last_name: 'tomsLastName',
            membership_id: 334,
            root: true,
          },
          id: 543,
          type: 'employees',
        },
        {
          attributes: {
            current: false,
            email: 'matteo@raise.com',
            first_name: 'Matteo',
            last_name: 'Palvarini',
            membership_id: 143,
            root: false,
          },
          id: 89,
          type: 'employees',
        },
        {
          attributes: {
            current: false,
            email: 'admin.employee@raise.com',
            first_name: 'Matteo',
            last_name: 'Test',
            membership_id: 172,
            root: false,
          },
          id: 161,
          type: 'employees',
        },
      ],
    },
    settings: {
      data: {
        attributes: {
          autolist: true,
          card_offer_editable: true,
          customer_offer_percentage: 0.5,
          customer_offer_type: 'VALUE',
          default_list_percentage: null,
          enable_swipe_scan: true,
        },
        id: 1,
        type: 'settings',
      },
    },
  },
  type: 'organizations',
};
