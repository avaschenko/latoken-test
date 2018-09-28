import os
import sys

moduleName = sys.argv[1]

modulesRootPath = './src/modules/{}'
modulePath = modulesRootPath.format(moduleName)

structure = {
    'rootPath': modulesRootPath.format(moduleName),
    'children': [
        {
            'type': 'dir',
            'name': 'components',
            'children': [
                {
                    'type': 'file',
                    'name': 'index',
                    'ext': 'js',
                    'lines': [],
                    'children': [],
                }
            ],
        },
        {
            'type': 'file',
            'name': 'index',
            'ext': 'js',
            'children': [],
            'lines': [
                'import actions from "./actions"',
                'import selectors from "./selectors"',
                'import reducers from "./reducers"',
                'import * as actionTypes from "./actionTypes";',
                'export default { reducers, actions, actionTypes, selectors };',

            ]
        },
        {
            'type': 'file',
            'name': 'actionTypes',
            'ext': 'js',
            'children': [],
            'lines': []
        },
        {
                    'type': 'file',
                    'name': 'selectors',
                    'ext': 'js',
                    'children': [],
                    'lines': []
                },
                {
                                    'type': 'file',
                                    'name': 'actions',
                                    'ext': 'js',
                                    'children': [],
                                    'lines': []
                                },
        {
                    'type': 'file',
                    'name': 'reducers',
                    'ext': 'js',
                    'children': [],
                    'lines': []
                },


    ]
}

os.mkdir(modulePath)


def generateStructure(list, root):
    def walkTo(item):
        if len(item.get('children')) > 0:
            normal_path = os.path.normpath(root + '/{}'.format(item.get('name')))
            os.mkdir(normal_path)
            return generateStructure(item.get('children'), os.path.normpath(normal_path))
        file = os.path.normpath(root + '/{name}.{ext}'.format(name=item.get('name'), ext=item.get('ext')))
        with open(file, mode='w') as f:
            for l in item.get('lines'):
                f.write(l + '\n')

        # if item.type == 'dir':
        #     return os.makedirs(root + '/{}'.format(item.name))

    map(walkTo, list)


generateStructure(structure.get('children'), structure.get('rootPath'))
# print(os.path.normpath('./app/src/modules/user/./index.js'))
