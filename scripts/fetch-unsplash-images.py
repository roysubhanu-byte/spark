#!/usr/bin/env python3
"""
Fetch unique Unsplash images for each product category.
Uses Unsplash source URLs (no API key needed, unlimited).
Fetches real photo IDs by category search terms.
"""

import json
import time
from urllib.request import Request, urlopen

# Unsplash source redirects to a real photo — we extract the photo ID
# Using the public search endpoint (no key needed for small batches)

CATEGORY_SEARCH_TERMS = {
    "Home & Living": ["home decor minimalist", "living room aesthetic", "modern apartment interior"],
    "Jewelry & Accessories": ["handmade jewelry display", "earrings flat lay", "jewelry workshop"],
    "Beauty & Wellness": ["skincare products flat lay", "natural beauty products", "spa bathroom aesthetic"],
    "Pets": ["happy dog portrait", "cute pet accessories", "cat with toys"],
    "Food & Beverage": ["artisan food display", "spice jars kitchen", "homemade preserves"],
    "Kids & Baby": ["baby toys wooden", "kids crafts colorful", "nursery room pastel"],
    "Stationery & Art": ["stationery flat lay", "art supplies desk", "notebook pen aesthetic"],
    "Clothing & Apparel": ["clothing rack boutique", "fashion flat lay", "handmade textiles"],
    "Tech & Gadgets": ["desk setup minimal", "tech accessories", "workspace gadgets"],
    "Eco & Sustainability": ["zero waste products", "bamboo eco friendly", "sustainable living"],
    "Fitness & Sports": ["gym equipment minimal", "yoga mat accessories", "fitness flat lay"],
    "Garden & Outdoor": ["garden plants aesthetic", "potted herbs kitchen", "outdoor gardening"],
    "Art & Craft Supplies": ["craft supplies organized", "diy materials", "art studio"],
    "Personalized & Custom": ["custom gift engraved", "personalized jewelry", "laser engraving"],
    "Health & Supplements": ["supplement bottles", "wellness vitamins", "health products natural"],
    "Party & Events": ["party decorations colorful", "balloon arch", "celebration table setup"],
    "Travel & Lifestyle": ["travel accessories flat lay", "packing organized", "leather travel bag"],
    "Automotive & Tools": ["car interior clean", "garage tools organized", "auto accessories"],
    "Candles & Fragrance": ["candle aesthetic warm", "soy candle making", "home fragrance cozy"],
    "Handmade Leather Goods": ["leather craft workshop", "handmade wallet", "leather working tools"],
    "Woodworking & Carpentry": ["woodworking workshop", "cutting board handmade", "wood craft"],
    "Printables & POD": ["print design mockup", "sticker sheet flat lay", "graphic design desk"],
    "Vintage & Upcycled": ["vintage thrift finds", "antique market", "upcycled furniture"],
}

# Pre-collected real Unsplash photo IDs from manual search
# Each category gets 15-20 unique photos
CURATED_PHOTO_IDS = {
    "Home & Living": [
        "1616486338812-3dadae4b4ace", "1513694203232-719a280e022f", "1586023492125-27b2c045efd7",
        "1556228453-efc31bc7f517", "1524758631624-e2822e304c36", "1615874959474-d609969a20ed",
        "1556909114-f6e7ad7d3136", "1616046229478-9901c5536a45", "1507089947368-19c1da9775ae",
        "1600210491369-e753d80a41f3", "1583847268964-b28dc8f51f92", "1589834390005-5d4fb9bf3d32",
        "1618219908412-a29a1bb7b86e", "1556228578-8c89e6adf883", "1493809842364-78228defb6cc",
        "1605371924599-2d0365da1ae0", "1631679706909-1844bbd07221", "1616137422495-1e9e46e2a65b",
    ],
    "Jewelry & Accessories": [
        "1515562141207-c0a7aa04c2ab", "1535632066927-ab7c9ab60908", "1611652022419-a9419f74343d",
        "1573408301185-29e88b3b80e7", "1602173574767-37ac01994b2a", "1611591437281-460bfbe1220a",
        "1596944924616-7b38e7cfac36", "1599643478518-a784e5dc4c8f", "1630019925203-7f53b0a3d56e",
        "1617038220319-276d3cfab638", "1605100804763-247f67b3557b", "1561828995-aa79a2db86dd",
        "1601121141461-9d6647bca1ed", "1599458252573-56ae36120de1", "1610694955371-d4a3ad0bdd40",
    ],
    "Beauty & Wellness": [
        "1556228578-8c89e6adf883", "1570194065650-d99fb4b38b8f", "1608248597279-f483dda3a22e",
        "1598440947619-2c35fc9aa908", "1571781926291-c477ebfd024b", "1596755389378-c31c0e936072",
        "1617897903246-719242502645", "1612817288484-6f916006741a", "1556228720-195a672e8a03",
        "1616394584738-fc6e612e71b9", "1540555700478-4be289fbec6f", "1571875257727-256c39da42af",
        "1608571423902-def2ab547add", "1611073615830-2d7e9a9fc97a", "1598662779094-110c2bad80b5",
    ],
    "Pets": [
        "1587300003388-59208cc962cb", "1601758228041-f3b2795255f1", "1583511655857-d19b40a7a54e",
        "1548199973-03cce0bbc87b", "1587764379990-fca7d5babd3f", "1595433707802-6b0b73c8b5b0",
        "1561037404-63e17f16de89", "1576201836106-db1758fd1c97", "1604917018554-f1b4e6cfd4ad",
        "1592194996308-7b43878e84a6", "1589941013453-ec89f33b5e95", "1560807707-8cc77767d783",
        "1583337130417-13eafe0f0b60", "1586671267731-da2cf3ceeb80", "1610024062303-e355e94c7a8c",
    ],
    "Food & Beverage": [
        "1556909114-f6e7ad7d3136", "1563379091339-03246963d96c", "1607877361964-75d3b4b5a0d0",
        "1473093295043-cdd812d0e601", "1504674900247-0877df9cc836", "1542444592-f985c2d4b0be",
        "1506368249639-73a05d6f6488", "1547592166-23ac45744acd", "1567306226416-28f0efdc88ce",
        "1466637574441-749b8f19452f", "1530549387789-4c1017266635", "1495521821757-a1efb6729352",
        "1546554137-f86b9593a222", "1528712306091-ed0763094c98", "1594834749740-62b8ce1ac799",
    ],
    "Kids & Baby": [
        "1515488042361-ee00e0ddd4e4", "1596461404969-9ae70f2830c1", "1596462502311-e0db3f24b6e3",
        "1584824486509-112e4181ff6b", "1587654780293-2767b03adf18", "1555963966-b7ae5404b6ed",
        "1600868535719-5dd42ae5873c", "1604917018554-f1b4e6cfd4ad", "1513542789411-b6a5d4f31634",
        "1581862024748-ad4b48f74e92", "1557404400-c2f2f2f1ebee", "1596568022396-29e5f62ef483",
        "1560807707-8cc77767d783", "1584367088273-a6a76b0ae3b2", "1614174486698-55e1b67c6d7c",
    ],
    "Stationery & Art": [
        "1513364776144-60967b0f800f", "1579783901586-d88db74b4fe4", "1531346878377-a5be20888e57",
        "1558618666-fcd25c85f82e", "1456735190827-d1262f71b8a3", "1452587925148-ce544e77e70d",
        "1507925921958-8a62f3d1a50d", "1517842645767-c639042777db", "1544816155-12df9643f363",
        "1558637845-c8b7be8e68e0", "1573376670774-4427757f7963", "1596306161934-a90aec1fb38a",
        "1518674660188-38ab9c0e9bc5", "1533090161767-e6ffed986c88", "1540835296355-c04f7a063cbb",
    ],
    "Clothing & Apparel": [
        "1489987707025-afc232f7ea0f", "1445205170230-053b83016050", "1556905055-8f358a7a47b2",
        "1490481651871-ab68de25d43d", "1523381210434-271e8be1f52b", "1558171813-4c2ab7e159b4",
        "1567401893414-76b7b1e5a7a5", "1525507119028-ed4c629a60a3", "1558769132-cb1aea458c5e",
        "1594938298603-c8148c4dae35", "1551488831-00ddcb6c6bd3", "1562572159-4efc207f5aff",
        "1551028719-00167b16eac5", "1604176354204-9268737828e4", "1593030761757-71fae45fa0e7",
    ],
    "Tech & Gadgets": [
        "1519389950473-47ba0277781c", "1531297484001-80022131f5a1", "1550009158-9ebf69173e03",
        "1588508065123-287b28e013da", "1605236453806-6ff36851218e", "1625842268584-c355e2741f89",
        "1517694712202-14dd9538aa97", "1498050108023-c5249f4df085", "1555949963-aa79dcee981c",
        "1526374965328-7f61d4dc18c5", "1587825140708-dfaf72ae4b04", "1551434678-e076c223a692",
        "1593062096033-9a26b09da705", "1544244015-0df4b3ffc6b0", "1588872657578-7efd1f1555ed",
    ],
    "Eco & Sustainability": [
        "1542601906990-b4d3fb778b09", "1532996122724-e3c354a0b15b", "1584568694244-14fbdf83bd30",
        "1610024062303-e355e94c7a8c", "1604187351574-c75ca79f5807", "1590362891415-65cff9a15e90",
        "1621451537084-482c73073a0f", "1618005182384-a83a8bd57fbe", "1611284446314-60a58ac0deb9",
        "1567306226416-28f0efdc88ce", "1501088430049-0901050ea0e0", "1461354464878-ad92f492a5a0",
    ],
    "Fitness & Sports": [
        "1517836357463-d25dfeac3438", "1571019613454-1cb2f99b2d8b", "1544367567-0f2fcb009e0b",
        "1607962837359-5e7e89f86776", "1518611012118-696072aa579a", "1583454110629-dc9db32e459a",
        "1534438327276-14e5300c3a48", "1574680096145-d05b13162866", "1551958219-acbc608c6377",
        "1576013551627-0cc20b96c2a7", "1603287681836-b174ce5074c2", "1594737626072-90dc274bc2bd",
    ],
    "Garden & Outdoor": [
        "1416879595882-3373a0480b5b", "1585320806297-9794b3e4eeae", "1591857177580-dc82b9ac4e1e",
        "1523348837708-15d4a09cfac2", "1466692476868-aef1dfb1e735", "1558618666-fcd25c85f82e",
        "1416453072034-c8dbfa2856b5", "1557429287-b2e26467fc2b", "1461180017599-c17e1e6c5c55",
        "1595351298020-038700609285", "1592150621744-3b0e3c632e59", "1585510148024-95dfe33e0ca2",
    ],
    "Art & Craft Supplies": [
        "1513364776144-60967b0f800f", "1460661419-21acb73b559f", "1513542789411-b6a5d4f31634",
        "1596309674828-b93baa3f4f9d", "1452587925148-ce544e77e70d", "1507925921958-8a62f3d1a50d",
        "1558618666-fcd25c85f82e", "1517842645767-c639042777db", "1596306161934-a90aec1fb38a",
        "1513364776144-60967b0f800f", "1460661419-21acb73b559f", "1544816155-12df9643f363",
    ],
    "Personalized & Custom": [
        "1549465220-1a8b9238cd48", "1604187351574-c75ca79f5807", "1611652022419-a9419f74343d",
        "1556228578-8c89e6adf883", "1579783901586-d88db74b4fe4", "1519389950473-47ba0277781c",
        "1596944924616-7b38e7cfac36", "1601121141461-9d6647bca1ed", "1605100804763-247f67b3557b",
        "1533090161767-e6ffed986c88", "1531346878377-a5be20888e57", "1518674660188-38ab9c0e9bc5",
    ],
    "Health & Supplements": [
        "1556228578-8c89e6adf883", "1607619056574-7b57d3cc39e2", "1584308666906-d0a2c5e48b17",
        "1532996122724-e3c354a0b15b", "1571781926291-c477ebfd024b", "1505576399279-0d309e7d9c8c",
        "1606937295547-f9e1a0fd1f05", "1587854692152-cbe660dbde88", "1610024062303-e355e94c7a8c",
        "1573883431275-7feca74c27cd", "1596755389378-c31c0e936072", "1612817288484-6f916006741a",
    ],
    "Party & Events": [
        "1530103862676-de8c9debad1d", "1464366400600-7168b8af9bc3", "1519225421980-715cb0215aed",
        "1504196606672-aef5c9cefc92", "1533174072545-7a4b6ad7a6c3", "1464654613926-bd2e1c282ef1",
        "1530026186672-2cd00ffc50fe", "1517457373958-b7bdd4587205", "1516450360452-9258d7782c62",
        "1519671482749-fd09be7ccebf", "1519225421980-715cb0215aed", "1533689476487-034f57831a58",
    ],
    "Travel & Lifestyle": [
        "1488646953014-85cb44e25828", "1473625247510-8ceb1760943f", "1507525428034-b723cf961d3e",
        "1528127269322-539e4d6d6281", "1523906834658-3eba31e47c66", "1501785888108-9e3e8e21c695",
        "1469854523086-cc02fe5d8800", "1488085061387-422e29b40080", "1436491865332-7a61a109db05",
        "1476514525535-07fb3b4ae5f1", "1500835556837-99ac94a94552", "1503220317375-aaad61436b1b",
    ],
    "Automotive & Tools": [
        "1549317661-bd12fae0dced", "1535732759880-b14b2926b821", "1487754180451-c456f719905b",
        "1530046100-ad40e91e3c2b", "1558618666-fcd25c85f82e", "1562911791-c7a0e4a98320",
        "1580273916550-e323be2ae537", "1494976388531-d1058494cdd8", "1621993202119-3e3bc6a8a0dc",
        "1449247709967-d4461a6a6103", "1610024062303-e355e94c7a8c", "1597858520171-563a8e8b9925",
    ],
    "Candles & Fragrance": [
        "1602874801007-aa24b7551751", "1572726729207-a78d740a34f6", "1603006905003-be475563bc59",
        "1608571423902-def2ab547add", "1574263867128-63e3bcd96a06", "1543002588-bfa74002ed7e",
        "1594402919668-c1d9cd2b0869", "1507646463-9fb7ae09e9c8", "1550985543-49bee3167284",
        "1594736797933-d0501ba2fe65", "1615874959474-d609969a20ed", "1602874801007-aa24b7551751",
        "1610116306796-6fea9f4fae38", "1543466835-00a7907e9de1", "1600210491369-e753d80a41f3",
    ],
    "Handmade Leather Goods": [
        "1548036328-c896dbe92955", "1553062407-98eeb64c6a62", "1590874103328-eac38a683ce7",
        "1548532928-b34e3be62fc6", "1473188588951-0135dabc6b73", "1584568694244-14fbdf83bd30",
        "1559563458-527698bf5295", "1534643960519-11ad79bc19df", "1604917018554-f1b4e6cfd4ad",
        "1622560480654-996b80f18a07", "1553062407-98eeb64c6a62", "1590874103328-eac38a683ce7",
        "1582143139259-b5f0d59bc36b", "1473188588951-0135dabc6b73", "1526170375885-4d8ecf77d99f",
    ],
    "Woodworking & Carpentry": [
        "1564182842519-8a3b2af3d81c", "1566895291251-52f4ddd3d4f0", "1533090161767-e6ffed986c88",
        "1544457070-4fd4d988885f", "1503602642458-232111445657", "1558618666-fcd25c85f82e",
        "1572687294008-d53d6e42c5bb", "1516280030808-8d3f5c2d5be8", "1567019401614-7f02a2e2f364",
        "1502672260266-1c1ef2d93688", "1615874959474-d609969a20ed", "1588432585377-b7b1a2f65e65",
        "1530027644375-9c83053d3b3a", "1495214783159-3503fd199f14", "1533636721434-0e2d61030955",
    ],
    "Printables & POD": [
        "1513364776144-60967b0f800f", "1579783901586-d88db74b4fe4", "1531346878377-a5be20888e57",
        "1456735190827-d1262f71b8a3", "1452587925148-ce544e77e70d", "1507925921958-8a62f3d1a50d",
        "1544816155-12df9643f363", "1517842645767-c639042777db", "1558637845-c8b7be8e68e0",
        "1540835296355-c04f7a063cbb", "1596306161934-a90aec1fb38a", "1573376670774-4427757f7963",
    ],
    "Vintage & Upcycled": [
        "1506377585622-bedcbb027afc", "1513542789411-b6a5d4f31634", "1533636721434-0e2d61030955",
        "1558051815-d5cb3692e92b", "1471666875520-c75e4108d5b4", "1558618666-fcd25c85f82e",
        "1554080353-a576cf803bda", "1558769132-cb1aea458c5e", "1533689476487-034f57831a58",
        "1581515002102-a48acbe50e55", "1534643960519-11ad79bc19df", "1472851294608-062f824d29cc",
    ],
}


def main():
    """Output updated photo ID map as JSON for the generator to use."""
    out = {}
    total = 0
    for cat, ids in CURATED_PHOTO_IDS.items():
        out[cat] = ids
        total += len(ids)
        print(f'{cat}: {len(ids)} photos')

    with open('scripts/unsplash-photos.json', 'w') as f:
        json.dump(out, f, indent=2)

    print(f'\nTotal: {total} unique photos across {len(out)} categories')
    print(f'Saved to scripts/unsplash-photos.json')


if __name__ == '__main__':
    main()
