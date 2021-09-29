<template>
    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            v-if="false"
        >
            <el-table-column
                prop="title"
                label="标题"
                show-overflow-tooltip
            />
            <el-table-column
                prop="route"
                label="路线"
            />
            <el-table-column
                prop="subWay"
                label="地铁站"
            />
            <el-table-column
                prop="sex"
                label="性别"
            />
            <el-table-column
                prop="amount"
                label="金额"
            />
            <el-table-column
                prop="phone"
                label="手机号"
                :formatter="formatPhone"
            />
            <el-table-column
                label="源地址"
                show-overflow-tooltip
            >
                <template #default="scope">
                    <a
                        :href="scope.row.url"
                        target="_blank"
                    >
                        {{scope.row.url}}
                    </a>
                </template>
            </el-table-column>
        </el-table>

        <el-card
            class="box-card"
            v-for="item in tableData"
            :key="item.url"
            shadow="always"
        >
            <el-descriptions
                class="margin-top"
                :title="item.title"
                :column="4"
                size="mini"
            >
                <el-descriptions-item
                    label="路线:"
                    :span="4"
                    width="100px"
                    label-align="right"
                >
                    <el-tag
                        v-for="(item, index) in item.route"
                        :key="item + index"
                        :type="item"
                        effect="dark"
                        size="mini"
                    >
                        {{ item }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                    label="地铁站:"
                    :span="4"
                    label-align="right"
                >
                    <el-tag
                        v-for="(item, index) in item.subWay"
                        :key="item + index"
                        :type="item"
                        effect="dark"
                        size="mini"
                    >
                        {{ item }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                    label="金额:"
                    :span="4"
                    label-align="right"
                >
                    <el-tag
                        v-for="(item, index) in item.amount"
                        :key="item + index"
                        :type="item"
                        effect="dark"
                        size="mini"
                    >
                        {{ item }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                    label="手机号:"
                    :span="4"
                    label-align="right"
                >{{ formatPhone(item.phone) }}</el-descriptions-item>
                <el-descriptions-item
                    label="性别:"
                    :span="2"
                    label-align="right"
                >{{ item.sex }}</el-descriptions-item>
                <el-descriptions-item
                    :span="2"
                    align="right"
                >
                    <el-button size="mini">
                        <a
                            :href="item.url"
                            target="_blank"
                        >帖子详情</a>
                    </el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <div class="pagination">
            <div>
                {{ start }} - {{ end }} of {{ query.total }}
            </div>
            <div>
                <svg
                    t="1632820659328"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3654"
                    width="20"
                    height="20"
                    @click="getList(-1)"
                >
                    <path
                        d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z"
                        p-id="3655"
                    ></path>
                </svg>
                <svg
                    t="1632820680981"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4438"
                    width="20"
                    height="20"
                    @click="getList(1)"
                >
                    <path
                        d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z"
                        p-id="4439"
                    ></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            query: {
                total: 0,
                page: 1,
                limit: 10
            }
        }
    },

    computed: {
        start() {
            return (this.query.page - 1) * this.query.limit + 1
        },
        end() {
            return (this.query.page) * this.query.limit
        }
    },

    created() {
        this.getList()
    },

    methods: {
        async getList(curPage) {
            if (curPage) {
                let page = this.query.page + curPage
                if (page > 0 && page <= Math.ceil(this.query.total / this.query.limit)) {
                    this.query.page = page
                }
            }
            let params = {
                page: this.query.page,
                limit: this.query.limit
            }
            let { list, limit, page, total } = await this.$api.getPostList(params)
            this.tableData = list
            this.query.page = page
            this.query.limit = limit
            this.query.total = total
            document.body.scrollTop = 0
            if (curPage) {
                window.scrollTo({
                    top: 0,
                    // behavior: 'smooth'
                })
            }
        },
        formatPhone(cellValue) {
            return cellValue.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
        }
    }
}
</script>

<style scoped>
.container {
    box-sizing: border-box;
    padding: 15px;
}
.box-card {
    margin-bottom: 15px;
}
.el-tag {
    margin-right: 10px;
}
.pagination {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.pagination svg {
    margin: 0 5px;
}
</style>
<style>
.container .el-descriptions__label {
    min-width: 100px;
}
.container .el-descriptions__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>