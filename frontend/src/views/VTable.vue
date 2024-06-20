<template>
    <div>
        <h3 style="text-align: center;"> 
            {{ message }} 数据总量 {{ tableData.length }}<br/>
            <vxe-button @click="getData">开始拉取数据</vxe-button>
        </h3>
        <div style="width: 1000px; margin: 0 auto;">
            <vxe-table
                border
                show-overflow
                show-header-overflow
                show-footer-overflow
                :loading="loading"
                ref="xTable1"
                height="600"
                :sort-config="{trigger: 'cell'}"
                :scroll-x="{enabled: true, gt: 10}"
                :scroll-y="{enabled: true, gt: 100}">
                <vxe-table-column type="seq" width="100"></vxe-table-column>
                <vxe-table-column field="id" title="ID" width="150" sortable></vxe-table-column>
                <vxe-table-column field="name" title="名字" width="150" sortable></vxe-table-column>
                <vxe-table-column field="phone" title="电话" width="100"></vxe-table-column></vxe-table-column>
                <vxe-table-column field="email" title="邮箱" width="100"></vxe-table-column>
                <vxe-table-column field="role" title="角色" width="150"></vxe-table-column>
                <vxe-table-column field="gender" title="性别" width="100"></vxe-table-column>
                <vxe-table-column field="age" title="年龄" width="100"></vxe-table-column>
                <vxe-table-column field="department" title="部门" width="100"></vxe-table-column>
                <vxe-table-column field="level" title="级别" width="100"></vxe-table-column>
                <vxe-table-column field="position" title="职位" width="100"></vxe-table-column>
                <vxe-table-column field="salary" title="薪资" width="100"></vxe-table-column>
                <vxe-table-column field="status" title="状态" width="100"></vxe-table-column>
                <vxe-table-column field="birthDate" title="出生日期" width="150"></vxe-table-column>
                <vxe-table-column field="address" title="地址" width="150"></vxe-table-column>
                <vxe-table-column field="city" title="城市" width="100"></vxe-table-column>
                <vxe-table-column field="country" title="国家" width="100"></vxe-table-column>
                <vxe-table-column field="zipCode" title="邮编" width="100"></vxe-table-column>
                <vxe-table-column field="children" title="子女" width="100"></vxe-table-column>
                <vxe-table-column field="createdAt" title="创建时间" width="150"></vxe-table-column>
                <vxe-table-column field="updatedAt" title="更新时间" width="150"></vxe-table-column>
                </vxe-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VTable',
        data() {
            return {
                message: 'Hello VxeTable!',
                tableData: [],
                isOverLoad: false,
                loading: false,
            }
        },
        methods: {
            handleTest() {
                console.log('Test button clicked');
            },
            // 假设这里有一个函数可以获取总数据条数
            async getTotalCount() {
                const response = await fetch('http://localhost:3800/api/big-data-count');
                const {data} = await response.json();
                return data;
            },
            getData() {
                console.log('Start loading data...');
                const that = this;
                if (typeof(Worker) !== "undefined") {
                    const worker = new Worker('./dataLoader.js');
                    let totalCount = 100000; // 总数据条数，需要从服务器获取
                    const pageSize = 1000;
                    async function startDataLoading() {
                        that.loading = true;
                        worker.postMessage({ apiUrl: 'http://localhost:3800/api/big-data-page', totalCount, pageSize });
                        worker.addEventListener('message', function(e) {
                            const message = e.data;
                            try {
                                if (message === 'allBatchesProcessed') {
                                    console.log('All batches have been processed');
                                    that.isOverLoad = true;
                                    that.showTable();
                                    worker.terminate(); // 所有数据处理完毕，终止worker
                                }else if ('error' in message) {
                                    console.error(`Error fetching data between ${message.startIndex} and ${message.endIndex}: ${message.error}`);
                                }else if ('data' in message) {
                                    that.pushData(message.data)
                                    console.log(`Data from ${message.startIndex} to ${message.endIndex} appended. Total items: ${message.data.length}`);
                                } else {
                                    worker.terminate(); 
                                }
                            } catch (error) {
                                console.log('Error processing message:', error);
                                worker.terminate(); 
                                that.loading=false
                            }
                            
                        });
                    }
                    startDataLoading().catch(error => console.error('Error starting data loading:', error));
                } else {
                    console.log("Sorry, your browser does not support Web Workers...");
                }
            },
            pushData(data) {
                this.tableData = this.tableData.concat(data);
            },
            showTable() {
                console.log('--- show table ---', this.tableData, this.isOverLoad);
                if (this.isOverLoad) {
                    const $table = this.$refs.xTable1
                    if ($table) {
                        $table.loadData(this.tableData)
                        this.loading=false
                    }
                }
            }
        }
    }
</script>