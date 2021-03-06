'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('employees', [
      {
        name: 'Admin User',
        position: 'Administrator',
        email: 'admin@admin.com',
        password_hash: 'admin',
        is_admin: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Vincenty Neads',
        position: 'Pharmacist',
        email: 'vneads0@goodreads.com',
        password_hash: 'wwlaxy0feyVC',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Vivianna Everiss',
        position: 'VP Sales',
        email: 'veveriss1@4shared.com',
        password_hash: 'STqG0wKcn',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Arnoldo Queenborough',
        position: 'Information Systems Manager',
        email: 'aqueenborough2@epa.gov',
        password_hash: 'KwB46k2mK1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dru Grindley',
        position: 'Speech Pathologist',
        email: 'dgrindley3@hao123.com',
        password_hash: 'kbfFtT',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Melvin MacPeice',
        position: 'Software Test Engineer IV',
        email: 'mmacpeice4@posterous.com',
        password_hash: 'IU7hy0X8d',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Kassie Cowdry',
        position: 'Engineer IV',
        email: 'kcowdry5@deviantart.com',
        password_hash: 'Cx9KBCNaWf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Loren Steen',
        position: 'Associate Professor',
        email: 'lsteen6@europa.eu',
        password_hash: 'rDNCdX4vg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rollo Darkins',
        position: 'VP Sales',
        email: 'rdarkins7@cocolog-nifty.com',
        password_hash: '927yPf5Ji',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Georgeta Licciardiello',
        position: 'Food Chemist',
        email: 'glicciardiello8@usa.gov',
        password_hash: 'mSZcIoBG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bree Paullin',
        position: 'Assistant Manager',
        email: 'bpaullin9@scribd.com',
        password_hash: 'dihPLG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Christen Girardy',
        position: 'Staff Accountant I',
        email: 'cgirardya@topsy.com',
        password_hash: 'Zy65Explbh',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'West Wakenshaw',
        position: 'Assistant Professor',
        email: 'wwakenshawb@sbwire.com',
        password_hash: '5kRgt4nLgf6U',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lyndell Wiltshaw',
        position: 'Geologist III',
        email: 'lwiltshawc@bbb.org',
        password_hash: '9k6v4A',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lucien Roussel',
        position: 'Chemical Engineer',
        email: 'lrousseld@home.pl',
        password_hash: 'jcZeP80w8Fru',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Karilynn Sharvill',
        position: 'Database Administrator II',
        email: 'ksharville@biblegateway.com',
        password_hash: 'CHdMN7BB2O',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Archie Reford',
        position: 'Data Coordiator',
        email: 'arefordf@hao123.com',
        password_hash: '6F9LmHKQLa',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ardith MacGrath',
        position: 'Office Assistant II',
        email: 'amacgrathg@google.fr',
        password_hash: 'UpoNv5Xwk',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dehlia Bratley',
        position: 'Analog Circuit Design manager',
        email: 'dbratleyh@linkedin.com',
        password_hash: 'bE7lyB8zOrv',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Gina Flannigan',
        position: 'Senior Quality Engineer',
        email: 'gflannigani@angelfire.com',
        password_hash: 'J8qCqx',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ruben Redemile',
        position: 'Biostatistician II',
        email: 'rredemilej@rediff.com',
        password_hash: '45aMTbV',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Farica Soames',
        position: 'Senior Quality Engineer',
        email: 'fsoamesk@examiner.com',
        password_hash: 'L4u49f',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Delmar Dormand',
        position: 'Human Resources Manager',
        email: 'ddormandl@house.gov',
        password_hash: 'AZ9xE9llbG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Suzie MacKessock',
        position: 'Assistant Manager',
        email: 'smackessockm@phpbb.com',
        password_hash: 'qBVlYqDHL',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cliff Towsey',
        position: 'Office Assistant III',
        email: 'ctowseyn@nba.com',
        password_hash: 'xsjgT4jqI',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jackson Videneev',
        position: 'Project Manager',
        email: 'jvideneevo@cmu.edu',
        password_hash: 'qApuI27',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nikolaus Tzuker',
        position: 'Marketing Manager',
        email: 'ntzukerp@people.com.cn',
        password_hash: 'LAHDoUB',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Yardley MacKeogh',
        position: 'Biostatistician III',
        email: 'ymackeoghq@google.de',
        password_hash: 'CE7gBOOa9i',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Hymie Villa',
        position: 'Account Coordinator',
        email: 'hvillar@redcross.org',
        password_hash: 'EVKo26lofyeY',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Urbano Harman',
        position: 'Associate Professor',
        email: 'uharmans@illinois.edu',
        password_hash: 'oKUzBqH6',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
}
