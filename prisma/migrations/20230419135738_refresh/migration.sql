-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `userRoleId` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DukcapilDesa` (
    `objectid` INTEGER NULL,
    `kode201701` VARCHAR(191) NOT NULL,
    `desa201701` VARCHAR(191) NULL,
    `kec201701` VARCHAR(191) NULL,
    `kab201701` VARCHAR(191) NULL,
    `prov201701` VARCHAR(191) NULL,
    `no_kode` INTEGER NULL,
    `no_prop` INTEGER NULL,
    `no_kab` INTEGER NULL,
    `no_kec` INTEGER NULL,
    `no_kel` INTEGER NULL,
    `kode_desa_` VARCHAR(191) NULL,
    `nama_prop_` VARCHAR(191) NULL,
    `nama_kab_s` VARCHAR(191) NULL,
    `nama_kec_s` VARCHAR(191) NULL,
    `nama_kel_s` VARCHAR(191) NULL,
    `jumlah_pen` INTEGER NULL,
    `jumlah_kk` INTEGER NULL,
    `luas_wilay` VARCHAR(191) NULL,
    `kepadatan_` VARCHAR(191) NULL,
    `perpindaha` INTEGER NULL,
    `jumlah_men` INTEGER NULL,
    `perubahan_` INTEGER NULL,
    `wajib_ktp` INTEGER NULL,
    `field1` VARCHAR(191) NULL,
    `field2` VARCHAR(191) NULL,
    `islam` INTEGER NULL,
    `kristen` INTEGER NULL,
    `katholik` INTEGER NULL,
    `hindu` INTEGER NULL,
    `budha` INTEGER NULL,
    `konghucu` INTEGER NULL,
    `kepercayaa` INTEGER NULL,
    `field3` VARCHAR(191) NULL,
    `field4` VARCHAR(191) NULL,
    `pria` INTEGER NULL,
    `wanita` INTEGER NULL,
    `field5` VARCHAR(191) NULL,
    `field6` VARCHAR(191) NULL,
    `belum_kawi` INTEGER NULL,
    `kawin` INTEGER NULL,
    `cerai_hidu` INTEGER NULL,
    `cerai_mati` INTEGER NULL,
    `field7` VARCHAR(191) NULL,
    `field8` VARCHAR(191) NULL,
    `u0` INTEGER NULL,
    `u5` INTEGER NULL,
    `u10` INTEGER NULL,
    `u15` INTEGER NULL,
    `u20` INTEGER NULL,
    `u25` INTEGER NULL,
    `u30` INTEGER NULL,
    `u35` INTEGER NULL,
    `u40` INTEGER NULL,
    `u45` INTEGER NULL,
    `u50` INTEGER NULL,
    `u55` INTEGER NULL,
    `u60` INTEGER NULL,
    `u65` INTEGER NULL,
    `u70` INTEGER NULL,
    `u75` INTEGER NULL,
    `field9` VARCHAR(191) NULL,
    `field10` VARCHAR(191) NULL,
    `lahir_thn1` INTEGER NULL,
    `lahir_seb` INTEGER NULL,
    `lahir_thn2` INTEGER NULL,
    `lahir_seb2` INTEGER NULL,
    `lahir_thn3` INTEGER NULL,
    `lahir_seb3` INTEGER NULL,
    `pertumbuha` INTEGER NULL,
    `pertumbuh2` INTEGER NULL,
    `pertumbuh3` INTEGER NULL,
    `field11` VARCHAR(191) NULL,
    `field12` VARCHAR(191) NULL,
    `pendidikan` INTEGER NULL,
    `pendidika2` INTEGER NULL,
    `pendidika3` INTEGER NULL,
    `pendidika4` INTEGER NULL,
    `pendidika5` INTEGER NULL,
    `pendidika6` INTEGER NULL,
    `field13` VARCHAR(191) NULL,
    `field14` VARCHAR(191) NULL,
    `tidak_belu` INTEGER NULL,
    `belum_tama` INTEGER NULL,
    `tamat_sd` INTEGER NULL,
    `sltp` INTEGER NULL,
    `slta` INTEGER NULL,
    `diploma_i_` INTEGER NULL,
    `diploma_ii` INTEGER NULL,
    `diploma_iv` INTEGER NULL,
    `strata_ii` INTEGER NULL,
    `strata_iii` INTEGER NULL,
    `field15` VARCHAR(191) NULL,
    `field16` VARCHAR(191) NULL,
    `a` INTEGER NULL,
    `b` INTEGER NULL,
    `ab` INTEGER NULL,
    `o` INTEGER NULL,
    `a_` INTEGER NULL,
    `a_2` INTEGER NULL,
    `b_` INTEGER NULL,
    `b_2` INTEGER NULL,
    `ab_` INTEGER NULL,
    `ab_2` INTEGER NULL,
    `o_` INTEGER NULL,
    `o_2` INTEGER NULL,
    `tidak_di_k` INTEGER NULL,
    `field17` VARCHAR(191) NULL,
    `field18` VARCHAR(191) NULL,
    `belum_tida` INTEGER NULL,
    `aparatur_p` INTEGER NULL,
    `tenaga_pen` INTEGER NULL,
    `wiraswasta` INTEGER NULL,
    `pertanian_` INTEGER NULL,
    `nelayan` INTEGER NULL,
    `agama_dan_` INTEGER NULL,
    `pelajar_ma` INTEGER NULL,
    `tenaga_kes` INTEGER NULL,
    `pensiunan` INTEGER NULL,
    `lainnya` INTEGER NULL,
    `field19` VARCHAR(191) NULL,
    `field20` VARCHAR(191) NULL,
    `generated_` VARCHAR(191) NULL,
    `field21` VARCHAR(191) NULL,
    `field22` VARCHAR(191) NULL,
    `kode_kel` VARCHAR(191) NULL,
    `field23` VARCHAR(191) NULL,
    `field24` VARCHAR(191) NULL,
    `p01_belum_` INTEGER NULL,
    `p02_mengur` INTEGER NULL,
    `p03_pelaja` INTEGER NULL,
    `p04_pensiu` INTEGER NULL,
    `p05_pegawa` INTEGER NULL,
    `p06_tentar` INTEGER NULL,
    `p07_kepoli` INTEGER NULL,
    `p08_perdag` INTEGER NULL,
    `p09_petani` INTEGER NULL,
    `p10_petern` INTEGER NULL,
    `p11_nelaya` INTEGER NULL,
    `p12_indust` INTEGER NULL,
    `p13_konstr` INTEGER NULL,
    `p14_transp` INTEGER NULL,
    `p15_karyaw` INTEGER NULL,
    `p16_karyaw` INTEGER NULL,
    `p17_karyaw` INTEGER NULL,
    `p18_karyaw` INTEGER NULL,
    `p19_buruh_` INTEGER NULL,
    `p20_buruh_` INTEGER NULL,
    `p21_buruh_` INTEGER NULL,
    `p22_buruh_` INTEGER NULL,
    `p23_pemban` INTEGER NULL,
    `p24_tukang` INTEGER NULL,
    `p25_tukang` INTEGER NULL,
    `p26_tukang` INTEGER NULL,
    `p27_tukang` INTEGER NULL,
    `p28_tukang` INTEGER NULL,
    `p29_tukang` INTEGER NULL,
    `p30_tukang` INTEGER NULL,
    `p31_tukang` INTEGER NULL,
    `p32_penata` INTEGER NULL,
    `p33_penata` INTEGER NULL,
    `p34_penata` INTEGER NULL,
    `p35_mekani` INTEGER NULL,
    `p36_senima` INTEGER NULL,
    `p37_tabib` INTEGER NULL,
    `p38_paraji` INTEGER NULL,
    `p39_peranc` INTEGER NULL,
    `p40_penter` INTEGER NULL,
    `p41_imam_m` INTEGER NULL,
    `p42_pendet` INTEGER NULL,
    `p43_pastor` INTEGER NULL,
    `p44_wartaw` INTEGER NULL,
    `p45_ustadz` INTEGER NULL,
    `p46_juru_m` INTEGER NULL,
    `p47_promot` INTEGER NULL,
    `p48_anggot` INTEGER NULL,
    `p49_anggot` INTEGER NULL,
    `p50_anggot` INTEGER NULL,
    `p51_presid` INTEGER NULL,
    `p52_wakil_` INTEGER NULL,
    `p53_anggot` INTEGER NULL,
    `p54_anggot` INTEGER NULL,
    `p55_duta_b` INTEGER NULL,
    `p56_gubern` INTEGER NULL,
    `p57_wakil_` INTEGER NULL,
    `p58_bupati` INTEGER NULL,
    `p59_wakil_` INTEGER NULL,
    `p60_waliko` INTEGER NULL,
    `p61_wakil_` INTEGER NULL,
    `p62_anggot` INTEGER NULL,
    `p63_anggot` INTEGER NULL,
    `p64_dosen` INTEGER NULL,
    `p65_guru` INTEGER NULL,
    `p66_pilot` INTEGER NULL,
    `p67_pengac` INTEGER NULL,
    `p68_notari` INTEGER NULL,
    `p69_arsite` INTEGER NULL,
    `p70_akunta` INTEGER NULL,
    `p71_konsul` INTEGER NULL,
    `p72_dokter` INTEGER NULL,
    `p73_bidan` INTEGER NULL,
    `p74_perawa` INTEGER NULL,
    `p75_apotek` INTEGER NULL,
    `p76_psikia` INTEGER NULL,
    `p77_penyia` INTEGER NULL,
    `p78_penyia` INTEGER NULL,
    `p79_pelaut` INTEGER NULL,
    `p80_peneli` INTEGER NULL,
    `p81_sopir` INTEGER NULL,
    `p82_pialan` INTEGER NULL,
    `p83_parano` INTEGER NULL,
    `p84_pedaga` INTEGER NULL,
    `p85_perang` INTEGER NULL,
    `p86_kepala` INTEGER NULL,
    `p87_biaraw` INTEGER NULL,
    `p88_wirasw` INTEGER NULL,
    `p89_lainny` INTEGER NULL,
    `test_luas_desa_oid` INTEGER NULL,
    `test_luas_desa_kode201701` VARCHAR(191) NULL,
    `test_luas_desa_desa201701` VARCHAR(191) NULL,
    `test_luas_desa_kec201701` VARCHAR(191) NULL,
    `test_luas_desa_kab201701` VARCHAR(191) NULL,
    `test_luas_desa_prov201701` VARCHAR(191) NULL,
    `test_luas_desa_no_kode` INTEGER NULL,
    `test_luas_desa_luas` VARCHAR(191) NULL,
    `data` VARCHAR(191) NULL,
    `f4_18_tahun_pendidikan_khusus` VARCHAR(191) NULL,
    `f5_6_tahun_paud` INTEGER NULL,
    `f7_12_tahun_sd` VARCHAR(191) NULL,
    `f12_15_tahun_smp` INTEGER NULL,
    `f16_18_tahun_sma` INTEGER NULL,
    `lahir_thn4` INTEGER NULL,
    `lahir_thn5` INTEGER NULL,
    `lahir_thn6` INTEGER NULL,
    `lahir_seb4` INTEGER NULL,
    `lahir_seb5` INTEGER NULL,
    `lahir_seb6` INTEGER NULL,
    `pertumbuh4` INTEGER NULL,
    `pertumbuh5` INTEGER NULL,
    `jml_rek_wktp` INTEGER NULL,

    PRIMARY KEY (`kode201701`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `provinceId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CityWordCloud` (
    `data` JSON NULL,
    `cityId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`cityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CityLeaderPersonaPrediction` (
    `data` JSON NULL,
    `cityId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`cityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CityContext` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `value` INTEGER NULL,
    `cityId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CityContextDirection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` JSON NULL,
    `cityId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `img` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CandidateValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value1` INTEGER NULL,
    `value2` INTEGER NULL,
    `candidateId` INTEGER NOT NULL,

    UNIQUE INDEX `CandidateValue_candidateId_key`(`candidateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataEmotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NULL,
    `provinceId` INTEGER NULL,
    `cityId` INTEGER NULL,
    `emotionId` INTEGER NULL,
    `value` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataByContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NULL,
    `provinceId` INTEGER NULL,
    `cityId` INTEGER NULL,
    `trust` INTEGER NULL,
    `joy` INTEGER NULL,
    `surprise` INTEGER NULL,
    `anticipation` INTEGER NULL,
    `sadness` INTEGER NULL,
    `fear` INTEGER NULL,
    `anger` INTEGER NULL,
    `disgust` INTEGER NULL,
    `date` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dataContentByTimeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataContentByTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `candidateId` INTEGER NULL,
    `data` JSON NULL,

    UNIQUE INDEX `DataContentByTime_date_candidateId_key`(`date`, `candidateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContextualContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,
    `date` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NationWideChart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `positive` INTEGER NULL,
    `negative` INTEGER NULL,
    `neutral` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SourceOfMention` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `media` VARCHAR(191) NULL,
    `value` INTEGER NULL,
    `indicator` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WordCloud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(191) NULL,
    `value` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CityValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` INTEGER NULL,
    `value` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24SosialMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24PopularAuthor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24Statistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24Chart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24Hastag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24Link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24importantAuthor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24ActiveAuthor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24ActiveUrl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24ImportantUrl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `B24PopularWord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `name` VARCHAR(191) NOT NULL,
    `value` JSON NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `des` TEXT NULL,
    `date` DATE NULL,
    `waktu` TIME NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userRoleId_fkey` FOREIGN KEY (`userRoleId`) REFERENCES `UserRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CityWordCloud` ADD CONSTRAINT `CityWordCloud_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CityLeaderPersonaPrediction` ADD CONSTRAINT `CityLeaderPersonaPrediction_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CityContext` ADD CONSTRAINT `CityContext_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CityContextDirection` ADD CONSTRAINT `CityContextDirection_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidateValue` ADD CONSTRAINT `CandidateValue_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataEmotion` ADD CONSTRAINT `DataEmotion_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataEmotion` ADD CONSTRAINT `DataEmotion_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataEmotion` ADD CONSTRAINT `DataEmotion_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataEmotion` ADD CONSTRAINT `DataEmotion_emotionId_fkey` FOREIGN KEY (`emotionId`) REFERENCES `Emotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataByContent` ADD CONSTRAINT `DataByContent_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataByContent` ADD CONSTRAINT `DataByContent_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataByContent` ADD CONSTRAINT `DataByContent_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataContentByTime` ADD CONSTRAINT `DataContentByTime_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CityValue` ADD CONSTRAINT `CityValue_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
