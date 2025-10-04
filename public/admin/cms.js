// Custom JavaScript for Decap CMS

// Custom preview component for posts
CMS.registerPreviewTemplate('posts', ({ entry, widgetFor }) => {
  const title = entry.getIn(['data', 'title']);
  const description = entry.getIn(['data', 'description']);
  const author = entry.getIn(['data', 'author']);
  const pubDate = entry.getIn(['data', 'pubDate']);
  const body = widgetFor('body');

  return `
    <div class="cms-preview">
      <article class="max-w-4xl mx-auto">
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">${title || 'Untitled'}</h1>
          <div class="text-gray-600 space-y-2">
            <p class="text-lg">${description || 'No description'}</p>
            <div class="flex items-center space-x-4 text-sm">
              <span>By ${author || 'Unknown Author'}</span>
              <span>•</span>
              <time datetime="${pubDate || new Date().toISOString()}">
                ${pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'No date'}
              </time>
            </div>
          </div>
        </header>
        
        <div class="prose prose-lg prose-gray max-w-none">
          ${body || '<p>No content yet...</p>'}
        </div>
      </article>
    </div>
  `;
});

// Custom widget for better date/time handling
CMS.registerWidget('datetime-local', 'datetime', {
  format: 'YYYY-MM-DDTHH:mm',
  parse: (value) => {
    if (!value) return null;
    return new Date(value);
  },
  format: (value) => {
    if (!value) return '';
    return new Date(value).toISOString().slice(0, 16);
  }
});

// Custom slug widget that generates from title
CMS.registerWidget('title-slug', 'string', {
  control: ({ value, onChange, forID }) => {
    const handleChange = (e) => {
      const title = e.target.value;
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      onChange(slug);
    };

    return React.createElement('input', {
      id: forID,
      value: value || '',
      onChange: handleChange,
      placeholder: 'Enter title to auto-generate slug',
      style: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }
    });
  }
});

// Auto-save functionality
let autoSaveTimeout;
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    console.log('Auto-saving entry:', entry.get('slug'));
    
    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    // Set new timeout for auto-save
    autoSaveTimeout = setTimeout(() => {
      console.log('Auto-save triggered');
    }, 5000);
  }
});

// Custom validation
CMS.registerEventListener({
  name: 'prePublish',
  handler: ({ entry }) => {
    const title = entry.getIn(['data', 'title']);
    const description = entry.getIn(['data', 'description']);
    const body = entry.getIn(['data', 'body']);
    
    if (!title || title.trim() === '') {
      alert('Please enter a title before publishing.');
      return false;
    }
    
    if (!description || description.trim() === '') {
      alert('Please enter a description before publishing.');
      return false;
    }
    
    if (!body || body.trim() === '') {
      alert('Please enter some content before publishing.');
      return false;
    }
    
    return true;
  }
});

// Enhanced markdown editor with footnote support
CMS.registerEditorComponent({
  id: 'footnote',
  label: 'Footnote',
  fields: [
    {
      name: 'id',
      label: 'Footnote ID',
      widget: 'string',
      hint: 'Unique identifier for the footnote (e.g., 1, 2, 3)'
    },
    {
      name: 'text',
      label: 'Footnote Text',
      widget: 'text',
      hint: 'The footnote content'
    }
  ],
  pattern: /\[\^(\d+)\]: (.+)/,
  fromBlock: (match) => ({
    id: match[1],
    text: match[2]
  }),
  toBlock: (obj) => `[^${obj.id}]: ${obj.text}`,
  toPreview: (obj) => `[^${obj.id}]: ${obj.text}`
});

// Add footnote reference component
CMS.registerEditorComponent({
  id: 'footnote-ref',
  label: 'Footnote Reference',
  fields: [
    {
      name: 'id',
      label: 'Footnote ID',
      widget: 'string',
      hint: 'Reference to footnote ID (e.g., 1, 2, 3)'
    }
  ],
  pattern: /\[\^(\d+)\]/,
  fromBlock: (match) => ({
    id: match[1]
  }),
  toBlock: (obj) => `[^${obj.id}]`,
  toPreview: (obj) => `[^${obj.id}]`
});

console.log('Decap CMS custom scripts loaded successfully!');
