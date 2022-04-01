import { split } from "lodash";
import *  as purchase from "../const/admin/purchase.const";
import *  as menu from "../const/menu.const";
import *  as primary from "../const/admin/primary.const";
import *  as support from "../const/admin/support.const";
import *  as user from "../const/admin/user.const";

import { treeClass } from "./tree";

export function armaMenu(permission: any[]) {
    if(permission.includes('all')){
        return menu.menuUsers;
    }
    let tree: treeClass = new treeClass();
    let padres = [];
    for (const item of permission) {
        const menu = MenuPermission[item];
        const splits = item.split('.');

        for (let index = 0; index < splits.length; index++) {
            const element = splits[index];
            const father = padres.find(item => item.id_nodo === element);
            if(!father){
                padres.push({
                    ...menu,
                    id_nodo: element,
                    padre: splits[index-1],
                    children:[]
                })
            }
        }
    }
    for (const iterator of padres) {
        tree.buscarPadre(iterator, padres);
    }
    return tree.data1;
}

export const MenuPermission = {
    "dashboard": menu.menuDashboard,
    "event": menu.menuCalendario,
    "purchase": purchase.Purchase,
    "purchase.quote": purchase.quoteGroup,
    "purchase.quote.create": purchase.quoteCreate,
    "purchase.quote.listQuote": purchase.quoteList,
    "purchase.quote.offerlist": purchase.quoteOfferList,
    "purchase.group": purchase.purchaseGroup,
    "purchase.group.listPurchase": purchase.purchaseList,
    "purchase.product.group": purchase.productGroup,
    "purchase.product.createProduct": purchase.productCreate,
    "purchase.product.listProduct": purchase.productList,
    "purchase.provider.group": purchase.providerGroup,
    "purchase.provider.createProvider": purchase.providerCreate,
    "purchase.provider.listProvider": purchase.providerList,
    "purchase.provider.myprovider": purchase.providerMyProvider,
    "primary": primary.primary,
    "primary.primaryProduct.group": primary.primaryProductGroup,
    "primary.family": primary.primaryFamily,
    "primary.subfamily": primary.primarySubfamily,
    "primary.sector": primary.primarySector,
    "primary.mark": primary.primaryMark,
    "primary.measurement": primary.primaryMeasurement,
    "primary.primaryGroup": primary.primaryGroup,
    "primary.primaryGroup.duration": primary.primaryDuration,
    "primary.primaryGroup.payment": primary.primaryPayment,
    "primary.primaryGroup.typeDocument": primary.primaryTypeDocument,
    "primary.primaryGroup.typeContact": primary.primaryTypeContact,
    "support": support.Support,
    "support.createSupport": support.supportCreate,
    "support.list": support.supportList,
    "support.tickets": support.supportListAll,
    "user": user.User,
    "user.groupUser": user.userGroup,
    "user.groupUser.createUser": user.userCreate,
    "user.groupUser.listUser": user.userList,
    "user.groupRol": user.rolgroup,
    "user.groupRol.createRol": user.rolCreate,
    "user.groupRol.listRol": user.rolList,
}

export const permissions = [
    // 'all',
    'dashboard',
    'event',
    'purchase',
    'purchase.quote',
    'purchase.quote.create',
    'purchase.quote.listQuote',
    'purchase.quote.offerlist',
    'purchase.group',
    'purchase.group.listPurchase',
    'purchase.product.group',
    'purchase.product.createProduct',
    'purchase.product.listProduct',
    'purchase.provider.group',
    'purchase.provider.createProvider',
    'purchase.provider.listProvider',
    'purchase.provider.myprovider',
    'primary',
    'primary.primaryProduct.group',
    'primary.primaryProduct.group',
    'primary.family',
    'primary.subfamily',
    'primary.sector',
    'primary.mark',
    'primary.measurement',
    'primary.primaryGroup',
    'primary.primaryGroup.payment',
    'primary.primaryGroup.duration',
    'primary.primaryGroup.typeContact',
    'primary.primaryGroup.typeDocument',
    'support',
    'support.createSupport',
    'support.list',
    'support.tickets',
    'user',
    'user.groupUser',
    'user.groupUser.createUser',
    'user.groupUser.listUser',
    'user.groupRol',
    'user.groupRol.createRol',
    'user.groupRol.listRol',
];