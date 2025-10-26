const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient();
async function main(){
 const passwordHash = await bcrypt.hash('demo1234',10);
 const user = await prisma.user.upsert({ where:{email:'demo@ledgerpro.local'}, create:{email:'demo@ledgerpro.local', name:'Demo', passwordHash}, update:{} });
 const customer = await prisma.contact.create({ data:{ userId:user.id, type:'CUSTOMER', name:'Acme Ltd', email:'billing@acme.com' } });
 const supplier = await prisma.contact.create({ data:{ userId:user.id, type:'SUPPLIER', name:'CloudHost Inc' } });
 const incomeCat = await prisma.category.create({ data:{ userId:user.id, name:'Consulting', type:'INCOME' } });
 const expenseCat = await prisma.category.create({ data:{ userId:user.id, name:'Hosting', type:'EXPENSE' } });
 const cash = await prisma.account.create({ data:{ userId:user.id, name:'Cash', type:'CASH', currency:'USD' } });
 const bank = await prisma.account.create({ data:{ userId:user.id, name:'Bank', type:'BANK', currency:'USD' } });
 const inv = await prisma.invoice.create({ data:{ userId:user.id, contactId:customer.id, categoryId:incomeCat.id, issueDate:new Date(), dueDate:new Date(Date.now()+12096e5), number:'INV-1001', currency:'USD', subtotal:1000, tax:180, total:1180, status:'SENT' } });
 await prisma.payment.create({ data:{ userId:user.id, contactId:customer.id, invoiceId:inv.id, accountId:bank.id, date:new Date(), amount:1180, currency:'USD', type:'COLLECTION', notes:'Bank transfer' } });
 await prisma.ledgerEntry.createMany({ data:[ { userId:user.id, contactId:supplier.id, categoryId:expenseCat.id, date:new Date(), description:'Monthly hosting', debit:0, credit:49, currency:'USD' }, { userId:user.id, contactId:customer.id, categoryId:incomeCat.id, date:new Date(), description:'Consulting service', debit:1180, credit:0, currency:'USD' } ] });
 console.log('Seeded.');
}
main().finally(()=>prisma.$disconnect());
