import type { RegionSources } from '../types'

export const SOURCES_DATA: Record<string, Record<string, RegionSources>> = {
  'soy-candles': {
    US: {
      amazon:   { total: 87, label: 'Starter kit \u00b7 4 items \u00b7 12 candles', ships: '2 days \u00b7 Prime', tag: 'amazon', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.com/s?k=soy+candle+starter+kit&tag=spark-20' },
      supplier: { total: 64, savings: 'save $23', label: 'eBay \u00b7 auction lots + buy-now', ships: '3\u20135 days', tag: 'eBay', tagColor: '#0064D2', tagText: '#fff', url: 'https://www.ebay.com/sch/i.html?_nkw=soy+candle+making+supplies' },
      bulk:     { total: 42, savings: 'cheapest', label: 'Bulk \u00b7 50-candle pack', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=soy+candle+bulk', note: 'For when you\'re ready to scale' }
    },
    IN: {
      amazon:   { total: 65, label: 'Starter kit \u00b7 4 items \u00b7 12 candles', ships: '2\u20133 days \u00b7 Prime', tag: 'Amazon.in', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.in/s?k=soy+candle+making+kit' },
      supplier: { total: 48, savings: 'save \u20b91,400', label: 'Meesho \u00b7 reseller pricing', ships: '5\u20137 days', tag: 'Meesho', tagColor: '#F43397', tagText: '#fff', url: 'https://www.meesho.com/search?q=candle%20making%20kit' },
      bulk:     { total: 28, savings: 'cheapest', label: 'IndiaMART \u00b7 bulk supplier', ships: '10\u201314 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/proddetail/soy-wax/', note: 'Direct factory \u00b7 MOQ applies' }
    },
    AE: {
      amazon:   { total: 95, label: 'Starter kit \u00b7 4 items \u00b7 12 candles', ships: '1\u20132 days \u00b7 Prime', tag: 'Amazon.ae', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.ae/s?k=soy+candle+making+kit' },
      supplier: { total: 78, savings: 'save AED 60', label: 'Noon \u00b7 UAE-stocked', ships: '2\u20134 days', tag: 'Noon', tagColor: '#FEEE00', tagText: '#1F1B16', url: 'https://www.noon.com/uae-en/search/?q=candle+making' },
      bulk:     { total: 48, savings: 'cheapest', label: 'AliExpress to UAE', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=soy+candle+bulk', note: 'For scale orders' }
    },
    RU: {
      amazon:   { total: 92, label: '\u0421\u0442\u0430\u0440\u0442\u043e\u0432\u044b\u0439 \u043d\u0430\u0431\u043e\u0440 \u00b7 12 \u0441\u0432\u0435\u0447\u0435\u0439', ships: '2\u20133 \u0434\u043d\u044f', tag: 'Ozon', tagColor: '#005BFF', tagText: '#fff', url: 'https://www.ozon.ru/search/?text=\u043d\u0430\u0431\u043e\u0440+\u0434\u043b\u044f+\u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u044f+\u0441\u0432\u0435\u0447\u0435\u0439' },
      supplier: { total: 71, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20bd1,900', label: 'Wildberries \u00b7 \u0431\u044b\u0441\u0442\u0440\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430', ships: '1\u20133 \u0434\u043d\u044f \u00b7 \u041f\u0412\u0417', tag: 'WB', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=\u043d\u0430\u0431\u043e\u0440+\u0441\u0432\u0435\u0447\u0435\u0439' },
      bulk:     { total: 45, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'Yandex Market \u00b7 \u043e\u043f\u0442\u043e\u043c', ships: '5\u201310 \u0434\u043d\u0435\u0439', tag: '\u042f.\u041c\u0430\u0440\u043a\u0435\u0442', tagColor: '#FFCC00', tagText: '#1F1B16', url: 'https://market.yandex.ru/search?text=\u0441\u043e\u0435\u0432\u044b\u0439+\u0432\u043e\u0441\u043a+\u043e\u043f\u0442\u043e\u043c', note: '\u0414\u043b\u044f \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u043d\u044b\u0445 \u0437\u0430\u043a\u0430\u0437\u043e\u0432' }
    },
    KZ: {
      amazon:   { total: 90, label: '\u0421\u0442\u0430\u0440\u0442\u043e\u0432\u044b\u0439 \u043d\u0430\u0431\u043e\u0440 \u00b7 12 \u0441\u0432\u0435\u0447\u0435\u0439', ships: '1\u20133 \u0434\u043d\u044f', tag: 'Kaspi', tagColor: '#F14635', tagText: '#fff', url: 'https://kaspi.kz/shop/search/?text=\u043d\u0430\u0431\u043e\u0440%20\u0434\u043b\u044f%20\u0441\u0432\u0435\u0447\u0435\u0439' },
      supplier: { total: 72, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20b88,500', label: 'Wildberries.kz', ships: '2\u20135 \u0434\u043d\u0435\u0439', tag: 'WB.kz', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.kz/catalog/0/search.aspx?search=\u043d\u0430\u0431\u043e\u0440+\u0441\u0432\u0435\u0447\u0435\u0439' },
      bulk:     { total: 50, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'AliExpress \u0432 KZ', ships: '14\u201321 \u0434\u043d\u0435\u0439', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=soy+candle+bulk', note: '\u0414\u043b\u044f \u043e\u043f\u0442\u043e\u0432\u044b\u0445 \u0437\u0430\u043a\u0430\u0437\u043e\u0432' }
    }
  },
  'pet-tags': {
    US: {
      amazon:   { total: 52, label: '50 blank tags + chains', ships: '2 days \u00b7 Prime', tag: 'amazon', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.com/s?k=pet+id+tag+blanks&tag=spark-20' },
      supplier: { total: 32, savings: 'save $20', label: 'eBay \u00b7 bulk lot deals', ships: '3\u20135 days', tag: 'eBay', tagColor: '#0064D2', tagText: '#fff', url: 'https://www.ebay.com/sch/i.html?_nkw=pet+id+tag+blanks+bulk' },
      bulk:     { total: 18, savings: 'cheapest', label: '500 tags \u00b7 factory direct', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=pet+id+tag+blank+bulk', note: 'Engraving machine sold separately' }
    },
    IN: {
      amazon:   { total: 22, label: '50 blank tags + chains + tools', ships: '2\u20133 days', tag: 'Amazon.in', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.in/s?k=pet+id+tag+blank' },
      supplier: { total: 15, savings: 'save \u20b9600', label: 'Meesho \u00b7 reseller', ships: '4\u20137 days', tag: 'Meesho', tagColor: '#F43397', tagText: '#fff', url: 'https://www.meesho.com/search?q=pet%20tag%20blank' },
      bulk:     { total: 8, savings: 'cheapest', label: '500 tags \u00b7 IndiaMART', ships: '7\u201314 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/proddetail/pet-id-tags/', note: 'Bulk MOQ \u00b7 negotiate price' }
    },
    AE: {
      amazon:   { total: 65, label: '50 blank tags + chains', ships: '1\u20132 days \u00b7 Prime', tag: 'Amazon.ae', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.ae/s?k=pet+id+tag+blank' },
      supplier: { total: 48, savings: 'save AED 60', label: 'Noon \u00b7 pet category', ships: '2\u20134 days', tag: 'Noon', tagColor: '#FEEE00', tagText: '#1F1B16', url: 'https://www.noon.com/uae-en/search/?q=pet+id+tag' },
      bulk:     { total: 22, savings: 'cheapest', label: '500 tags \u00b7 AliExpress', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=pet+id+tag+bulk', note: 'For when you scale' }
    },
    RU: {
      amazon:   { total: 55, label: '50 \u0437\u0430\u0433\u043e\u0442\u043e\u0432\u043e\u043a + \u0446\u0435\u043f\u043e\u0447\u043a\u0438', ships: '2\u20133 \u0434\u043d\u044f', tag: 'Ozon', tagColor: '#005BFF', tagText: '#fff', url: 'https://www.ozon.ru/search/?text=\u0436\u0435\u0442\u043e\u043d+\u0434\u043b\u044f+\u0441\u043e\u0431\u0430\u043a+\u0437\u0430\u0433\u043e\u0442\u043e\u0432\u043a\u0430' },
      supplier: { total: 38, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20bd1,500', label: 'Wildberries', ships: '1\u20133 \u0434\u043d\u044f \u00b7 \u041f\u0412\u0417', tag: 'WB', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=\u0436\u0435\u0442\u043e\u043d+\u0434\u043b\u044f+\u0441\u043e\u0431\u0430\u043a' },
      bulk:     { total: 22, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'Yandex Market \u00b7 \u043e\u043f\u0442', ships: '5\u201310 \u0434\u043d\u0435\u0439', tag: '\u042f.\u041c\u0430\u0440\u043a\u0435\u0442', tagColor: '#FFCC00', tagText: '#1F1B16', url: 'https://market.yandex.ru/search?text=\u0430\u0434\u0440\u0435\u0441\u043d\u0438\u043a+\u043e\u043f\u0442', note: '\u0414\u043b\u044f \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0430' }
    },
    KZ: {
      amazon:   { total: 35, label: '50 \u0437\u0430\u0433\u043e\u0442\u043e\u0432\u043e\u043a + \u0446\u0435\u043f\u043e\u0447\u043a\u0438', ships: '1\u20133 \u0434\u043d\u044f', tag: 'Kaspi', tagColor: '#F14635', tagText: '#fff', url: 'https://kaspi.kz/shop/search/?text=\u0436\u0435\u0442\u043e\u043d%20\u0434\u043b\u044f%20\u0441\u043e\u0431\u0430\u043a\u0438' },
      supplier: { total: 25, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20b84,500', label: 'Wildberries.kz', ships: '2\u20135 \u0434\u043d\u0435\u0439', tag: 'WB.kz', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.kz/catalog/0/search.aspx?search=\u0436\u0435\u0442\u043e\u043d+\u0441\u043e\u0431\u0430\u043a\u0430' },
      bulk:     { total: 12, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: '500 \u0448\u0442 \u00b7 AliExpress', ships: '14\u201321 \u0434\u043d\u0435\u0439', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=pet+id+tag+bulk', note: '\u041f\u0440\u0438 \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0438' }
    }
  },
  'silver-jewelry': {
    US: {
      amazon:   { total: 120, label: '20-piece silver inventory', ships: '2 days \u00b7 Prime', tag: 'amazon', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.com/s?k=sterling+silver+jewelry+wholesale&tag=spark-20' },
      supplier: { total: 78, savings: 'save $42', label: 'eBay \u00b7 925 silver lots', ships: '3\u20137 days', tag: 'eBay', tagColor: '#0064D2', tagText: '#fff', url: 'https://www.ebay.com/sch/i.html?_nkw=925+sterling+silver+wholesale+lot' },
      bulk:     { total: 45, savings: 'cheapest', label: 'Jaipur wholesale \u00b7 50 pieces', ships: '10\u201314 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/jaipur-silver/', note: 'Air freight via agent' }
    },
    IN: {
      amazon:   { total: 38, label: '20-piece silver starter', ships: '2\u20133 days', tag: 'Amazon.in', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.in/s?k=sterling+silver+jewelry+wholesale' },
      supplier: { total: 24, savings: 'save \u20b91,200', label: 'Meesho \u00b7 jewelry resellers', ships: '4\u20136 days', tag: 'Meesho', tagColor: '#F43397', tagText: '#fff', url: 'https://www.meesho.com/search?q=silver%20jewelry%20wholesale' },
      bulk:     { total: 12, savings: 'cheapest', label: '50 pieces \u00b7 Jaipur factory', ships: '7\u201310 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/jaipur-silver-wholesale/', note: 'Negotiate MOQ' }
    },
    AE: {
      amazon:   { total: 130, label: '20-piece silver starter', ships: '1\u20132 days \u00b7 Prime', tag: 'Amazon.ae', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.ae/s?k=sterling+silver+jewelry' },
      supplier: { total: 95, savings: 'save AED 130', label: 'Noon \u00b7 jewelry category', ships: '2\u20134 days', tag: 'Noon', tagColor: '#FEEE00', tagText: '#1F1B16', url: 'https://www.noon.com/uae-en/search/?q=sterling+silver+jewelry' },
      bulk:     { total: 50, savings: 'cheapest', label: '50 pcs \u00b7 IndiaMART export', ships: '7\u201314 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/jaipur-silver-wholesale/', note: 'Bulk import via Dubai' }
    },
    RU: {
      amazon:   { total: 110, label: '20 \u0441\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0445 \u0443\u043a\u0440\u0430\u0448\u0435\u043d\u0438\u0439', ships: '2\u20133 \u0434\u043d\u044f', tag: 'Ozon', tagColor: '#005BFF', tagText: '#fff', url: 'https://www.ozon.ru/search/?text=\u0443\u043a\u0440\u0430\u0448\u0435\u043d\u0438\u044f+925+\u0441\u0435\u0440\u0435\u0431\u0440\u043e+\u043e\u043f\u0442' },
      supplier: { total: 72, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20bd3,500', label: 'Wildberries', ships: '1\u20133 \u0434\u043d\u044f \u00b7 \u041f\u0412\u0417', tag: 'WB', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=\u0441\u0435\u0440\u0435\u0431\u0440\u043e+925+\u043e\u043f\u0442' },
      bulk:     { total: 40, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'AliExpress \u00b7 \u0438\u0437 \u0418\u043d\u0434\u0438\u0438', ships: '10\u201321 \u0434\u0435\u043d\u044c', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=925+silver+wholesale', note: '\u041f\u0440\u044f\u043c\u044b\u0435 \u043f\u043e\u0441\u0442\u0430\u0432\u043a\u0438' }
    },
    KZ: {
      amazon:   { total: 95, label: '20 \u0441\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0445 \u0443\u043a\u0440\u0430\u0448\u0435\u043d\u0438\u0439', ships: '1\u20133 \u0434\u043d\u044f', tag: 'Kaspi', tagColor: '#F14635', tagText: '#fff', url: 'https://kaspi.kz/shop/search/?text=\u0441\u0435\u0440\u0435\u0431\u0440\u043e%20925%20\u0443\u043a\u0440\u0430\u0448\u0435\u043d\u0438\u044f' },
      supplier: { total: 68, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20b812,000', label: 'Wildberries.kz', ships: '2\u20135 \u0434\u043d\u0435\u0439', tag: 'WB.kz', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.kz/catalog/0/search.aspx?search=\u0441\u0435\u0440\u0435\u0431\u0440\u043e+925' },
      bulk:     { total: 35, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'AliExpress \u00b7 \u0438\u0437 \u0418\u043d\u0434\u0438\u0438', ships: '10\u201321 \u0434\u0435\u043d\u044c', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=925+silver+wholesale', note: '\u041e\u043f\u0442\u043e\u0432\u044b\u0435 \u043f\u0430\u0440\u0442\u0438\u0438' }
    }
  },
  'lip-balm': {
    US: {
      amazon:   { total: 48, label: 'Make 50 lip balms \u00b7 full kit', ships: '2 days \u00b7 Prime', tag: 'amazon', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.com/s?k=lip+balm+making+kit&tag=spark-20' },
      supplier: { total: 32, savings: 'save $16', label: 'eBay \u00b7 ingredient lots', ships: '3\u20136 days', tag: 'eBay', tagColor: '#0064D2', tagText: '#fff', url: 'https://www.ebay.com/sch/i.html?_nkw=lip+balm+making+ingredients' },
      bulk:     { total: 19, savings: 'cheapest', label: 'Make 200 \u00b7 bulk ingredients', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=lip+balm+ingredients+bulk', note: 'Tubes sold separately' }
    },
    IN: {
      amazon:   { total: 18, label: 'Make 50 lip balms \u00b7 full kit', ships: '2\u20133 days', tag: 'Amazon.in', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.in/s?k=lip+balm+making+kit' },
      supplier: { total: 12, savings: 'save \u20b9500', label: 'Meesho \u00b7 DIY supplies', ships: '4\u20137 days', tag: 'Meesho', tagColor: '#F43397', tagText: '#fff', url: 'https://www.meesho.com/search?q=lip%20balm%20base' },
      bulk:     { total: 6, savings: 'cheapest', label: 'Make 200 \u00b7 raw materials', ships: '7\u201310 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/proddetail/lip-balm-base/', note: 'Pack yourself' }
    },
    AE: {
      amazon:   { total: 55, label: 'Make 50 lip balms \u00b7 full kit', ships: '1\u20132 days \u00b7 Prime', tag: 'Amazon.ae', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.ae/s?k=lip+balm+making+kit' },
      supplier: { total: 42, savings: 'save AED 48', label: 'Noon \u00b7 beauty supplies', ships: '2\u20134 days', tag: 'Noon', tagColor: '#FEEE00', tagText: '#1F1B16', url: 'https://www.noon.com/uae-en/search/?q=lip+balm+making' },
      bulk:     { total: 22, savings: 'cheapest', label: 'AliExpress \u00b7 200 batch', ships: '14\u201321 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=lip+balm+ingredients+bulk', note: 'Tubes sold separately' }
    },
    RU: {
      amazon:   { total: 50, label: '\u041d\u0430\u0431\u043e\u0440 \u0434\u043b\u044f 50 \u0431\u0430\u043b\u044c\u0437\u0430\u043c\u043e\u0432', ships: '2\u20133 \u0434\u043d\u044f', tag: 'Ozon', tagColor: '#005BFF', tagText: '#fff', url: 'https://www.ozon.ru/search/?text=\u043d\u0430\u0431\u043e\u0440+\u0434\u043b\u044f+\u0431\u0430\u043b\u044c\u0437\u0430\u043c\u0430+\u0434\u043b\u044f+\u0433\u0443\u0431' },
      supplier: { total: 35, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20bd1,400', label: 'Wildberries', ships: '1\u20133 \u0434\u043d\u044f \u00b7 \u041f\u0412\u0417', tag: 'WB', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=\u0431\u0430\u043b\u044c\u0437\u0430\u043c+\u0434\u043b\u044f+\u0433\u0443\u0431+\u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u044b' },
      bulk:     { total: 18, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'AliExpress \u00b7 200 \u0448\u0442', ships: '14\u201321 \u0434\u0435\u043d\u044c', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=lip+balm+ingredients+bulk', note: '\u0422\u0443\u0431\u044b \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u043e' }
    },
    KZ: {
      amazon:   { total: 45, label: '\u041d\u0430\u0431\u043e\u0440 \u0434\u043b\u044f 50 \u0431\u0430\u043b\u044c\u0437\u0430\u043c\u043e\u0432', ships: '1\u20133 \u0434\u043d\u044f', tag: 'Kaspi', tagColor: '#F14635', tagText: '#fff', url: 'https://kaspi.kz/shop/search/?text=\u0431\u0430\u043b\u044c\u0437\u0430\u043c%20\u0434\u043b\u044f%20\u0433\u0443\u0431%20\u043d\u0430\u0431\u043e\u0440' },
      supplier: { total: 32, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20b86,000', label: 'Wildberries.kz', ships: '2\u20135 \u0434\u043d\u0435\u0439', tag: 'WB.kz', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.kz/catalog/0/search.aspx?search=\u0431\u0430\u043b\u044c\u0437\u0430\u043c+\u0434\u043b\u044f+\u0433\u0443\u0431' },
      bulk:     { total: 15, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: 'AliExpress \u00b7 200 \u0448\u0442', ships: '14\u201321 \u0434\u0435\u043d\u044c', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=lip+balm+ingredients+bulk', note: '\u0422\u0443\u0431\u044b \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u043e' }
    }
  },
  'tiffin-service': {
    US: {
      amazon:   { total: 95, label: '30 reusable lunch boxes + bags', ships: '2 days \u00b7 Prime', tag: 'amazon', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.com/s?k=meal+prep+containers+30+pack&tag=spark-20' },
      supplier: { total: 68, savings: 'save $27', label: 'eBay \u00b7 restaurant lots', ships: '3\u20135 days', tag: 'eBay', tagColor: '#0064D2', tagText: '#fff', url: 'https://www.ebay.com/sch/i.html?_nkw=meal+prep+containers+wholesale' },
      bulk:     { total: 38, savings: 'cheapest', label: '100 disposable boxes \u00b7 bulk', ships: '7\u201310 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=meal+prep+containers+bulk', note: 'For high volume' }
    },
    IN: {
      amazon:   { total: 25, label: '30 tiffin boxes (3-comp)', ships: '2\u20133 days', tag: 'Amazon.in', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.in/s?k=tiffin+box+3+compartment' },
      supplier: { total: 18, savings: 'save \u20b9600', label: 'Meesho \u00b7 reseller', ships: '4\u20136 days', tag: 'Meesho', tagColor: '#F43397', tagText: '#fff', url: 'https://www.meesho.com/search?q=tiffin%20box%203%20compartment' },
      bulk:     { total: 9, savings: 'cheapest', label: '100 single-use \u00b7 IndiaMART', ships: '5\u20137 days', tag: 'IndiaMART', tagColor: '#FF6F00', tagText: '#fff', url: 'https://www.indiamart.com/proddetail/disposable-tiffin/', note: 'Order in cartons' }
    },
    AE: {
      amazon:   { total: 105, label: '30 reusable tiffin boxes', ships: '1\u20132 days \u00b7 Prime', tag: 'Amazon.ae', tagColor: '#FF9900', tagText: '#fff', url: 'https://www.amazon.ae/s?k=tiffin+box+meal+prep' },
      supplier: { total: 82, savings: 'save AED 85', label: 'Noon \u00b7 kitchen supplies', ships: '2\u20134 days', tag: 'Noon', tagColor: '#FEEE00', tagText: '#1F1B16', url: 'https://www.noon.com/uae-en/search/?q=meal+prep+containers' },
      bulk:     { total: 42, savings: 'cheapest', label: '100 boxes \u00b7 AliExpress', ships: '7\u201314 days', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=meal+prep+containers+bulk', note: 'For volume orders' }
    },
    RU: {
      amazon:   { total: 88, label: '30 \u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u043e\u0432 \u0434\u043b\u044f \u0435\u0434\u044b', ships: '2\u20133 \u0434\u043d\u044f', tag: 'Ozon', tagColor: '#005BFF', tagText: '#fff', url: 'https://www.ozon.ru/search/?text=\u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u044b+\u0434\u043b\u044f+\u043e\u0431\u0435\u0434\u043e\u0432+30+\u0448\u0442' },
      supplier: { total: 60, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20bd2,500', label: 'Wildberries', ships: '1\u20133 \u0434\u043d\u044f \u00b7 \u041f\u0412\u0417', tag: 'WB', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=\u043b\u0430\u043d\u0447+\u0431\u043e\u043a\u0441+\u043e\u043f\u0442\u043e\u043c' },
      bulk:     { total: 32, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: '100 \u0448\u0442 \u00b7 AliExpress', ships: '7\u201314 \u0434\u043d\u0435\u0439', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=meal+prep+containers+bulk', note: '\u0411\u043e\u043b\u044c\u0448\u0438\u0435 \u043f\u0430\u0440\u0442\u0438\u0438' }
    },
    KZ: {
      amazon:   { total: 75, label: '30 \u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u043e\u0432 \u0434\u043b\u044f \u0435\u0434\u044b', ships: '1\u20133 \u0434\u043d\u044f', tag: 'Kaspi', tagColor: '#F14635', tagText: '#fff', url: 'https://kaspi.kz/shop/search/?text=\u043b\u0430\u043d\u0447%20\u0431\u043e\u043a\u0441%20\u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440' },
      supplier: { total: 55, savings: '\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u20b89,500', label: 'Wildberries.kz', ships: '2\u20135 \u0434\u043d\u0435\u0439', tag: 'WB.kz', tagColor: '#CB11AB', tagText: '#fff', url: 'https://www.wildberries.kz/catalog/0/search.aspx?search=\u043b\u0430\u043d\u0447+\u0431\u043e\u043a\u0441' },
      bulk:     { total: 28, savings: '\u0434\u0435\u0448\u0435\u0432\u043b\u0435 \u0432\u0441\u0435\u0433\u043e', label: '100 \u0448\u0442 \u00b7 AliExpress', ships: '7\u201314 \u0434\u043d\u0435\u0439', tag: 'AliExpress', tagColor: '#FFE4B5', tagText: '#1F1B16', url: 'https://www.aliexpress.com/wholesale?SearchText=meal+prep+containers+bulk', note: '\u0411\u043e\u043b\u044c\u0448\u0438\u0435 \u043f\u0430\u0440\u0442\u0438\u0438' }
    }
  }
}
